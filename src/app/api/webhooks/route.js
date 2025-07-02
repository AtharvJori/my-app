import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextResponse } from "next/server";
import { createOrUpdateUser, deleteUser } from "@/lib/actions/user.actions";
import { connectToDB } from "@/lib/mongodb/connection";

export async function POST(request) {
  try {
    const evt = await verifyWebhook(request, {
      secret: process.env.CLERK_WEBHOOK_SECRET,
    });

    const { id, first_name, last_name, image_url, email_addresses } = evt.data;
    const eventType = evt.type;

    console.log(`Processing Clerk webhook: ${eventType} for user ${id}`);

    // Connect to MongoDB
    await connectToDB();

    switch (eventType) {
      case "user.created":
      case "user.updated":
        const updatedUser = await createOrUpdateUser({
          id,
          first_name,
          last_name,
          image_url,
          email_addresses,
        });
        console.log("User saved to MongoDB:", updatedUser);
        break;

      case "user.deleted":
        const deletedUser = await deleteUser(id);
        console.log("User soft-deleted in MongoDB:", deletedUser);
        break;

      default:
        console.warn(`Unhandled event type: ${eventType}`);
        return NextResponse.json(
          { message: "Unhandled event type" },
          { status: 200 }
        );
    }

    return NextResponse.json(
      { success: true, message: "Webhook processed" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error processing Clerk webhook:", err);
    return NextResponse.json(
      { error: "Webhook processing failed", details: err.message },
      { status: 400 }
    );
  }
}
