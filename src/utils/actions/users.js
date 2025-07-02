// utils/user.actions.js
import { dbConnect } from "../mongodb/mongoose"; // Your DB connection file
import User from "../models/user.model"; // Your User model/schema

/**
 * Creates or updates a user in MongoDB based on Clerk webhook data
 * @param {Object} userData - Clerk user data
 * @param {string} userData.id - Clerk user ID
 * @param {string} userData.first_name - User's first name
 * @param {string} userData.last_name - User's last name
 * @param {string} userData.image_url - Profile picture URL
 * @param {Array} userData.email_addresses - Array of email addresses
 * @returns {Promise<Object>} The created/updated user document
 */
export const createOrUpdateUser = async ({
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
}) => {
  try {
    await dbConnect(); // Ensure DB connection

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0].email_address,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          clerkId: id,
          favorites: [],
          watchlist: [],
          createdAt: new Date(),
          isActive: true,
        },
      },
      {
        upsert: true, // Create if doesn't exist
        new: true, // Return the updated document
        runValidators: true, // Validate the update
      }
    );

    return user;
  } catch (error) {
    console.error("Error creating/updating user:", error);
    throw new Error("Failed to create/update user");
  }
};

/**
 * Deletes a user by setting isActive to false (soft delete)
 * @param {string} clerkId - Clerk user ID
 * @returns {Promise<Object>} The updated user document
 */
export const deleteUser = async (clerkId) => {
  try {
    await connectToDB();

    const user = await User.findOneAndUpdate(
      { clerkId },
      {
        $set: {
          isActive: false,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};
