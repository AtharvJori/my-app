import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextResponse } from "next/server";
import { createOrUpdateUser, deleteUser } from "@/utils/actions/users";
import { connectToDB } from "@/utils/mongodb/mongoose";
import mongoose from "mongoose";

// Helper function for consistent success responses
const successResponse = (message, data = null) =>
  NextResponse.json(
    {
      success: true,
      message,
      ...(data && { data }),
    },
    { status: 200 }
  );

// Helper function for error responses
const errorResponse = (message, error = null, status = 400) =>
  NextResponse.json(
    {
      success: false,
      message,
      ...(error && { error: error.message || error.toString() }),
    },
    { status }
  );

export async function POST(request) {
  // Security checks
  const headers = request.headers;
  if (headers.get("content-type") !== "application/json") {
    return errorResponse("Invalid content type", null, 415);
  }

  try {
    // Verify webhook signature
    const evt = await verifyWebhook(request, {
      secret: process.env.CLERK_WEBHOOK_SECRET,
    });

    const { id, first_name, last_name, image_url, email_addresses } = evt.data;
    const eventType = evt.type;

    // Structured logging
    console.log({
      event: "Webhook Processing",
      type: eventType,
      userId: id,
      action: eventType.includes("deleted") ? "deletion" : "upsert",
    });

    // Input validation
    if (!id || !email_addresses?.length) {
      console.warn("Missing required user data", { id, email_addresses });
      return errorResponse("Missing required user data");
    }

    // Database connection with error handling
    try {
      await connectToDB().catch((err) => {
        throw new Error(`Database connection failed: ${err.message}`);
      });
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return errorResponse("Database connection failed", dbError, 500);
    }

    const session = await mongoose.startSession();
    let result;

    try {
      session.startTransaction();

      switch (eventType) {
        case "user.created":
        case "user.updated":
          result = await createOrUpdateUser(
            {
              id,
              first_name,
              last_name,
              image_url,
              email_addresses,
            },
            { session }
          );
          console.log("User saved to MongoDB:", result);
          break;

        case "user.deleted":
          result = await deleteUser(id, { session });
          console.log("User soft-deleted in MongoDB:", result);
          break;

        default:
          console.warn(`Unhandled event type: ${eventType}`);
          return successResponse("Unhandled event type (no action taken)");
      }

      await session.commitTransaction();
      return successResponse("Webhook processed successfully", result);
    } catch (opError) {
      await session.abortTransaction();
      console.error("Operation failed:", opError);
      throw opError;
    } finally {
      session.endSession();
    }
  } catch (err) {
    console.error("Error processing Clerk webhook:", err);
    return errorResponse("Webhook processing failed", err);
  }
}
