import User from "@/utils/models/user.js";
import { connectToDB } from "@/utils/mongodb/mongoose.js";

export const createOrUpdateUser = async ({
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  primary_email_address_id // Added this parameter
}) => {
  try {
    await connectToDB();

    // Find primary email - fixed to use the passed parameter instead of undefined 'evt'
    const primaryEmail =
      email_addresses.find(
        (email) => email.id === primary_email_address_id
      )?.email_address || email_addresses[0]?.email_address;

    const userData = {
      clerkId: id,
      firstName: first_name,
      lastName: last_name,
      email: primaryEmail,
      profilePicture: image_url,
      updatedAt: new Date(),
    };

    const options = {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    };

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: userData,
        $setOnInsert: {
          favorites: [],
          watchlist: [],
          isActive: true,
          createdAt: new Date(),
        },
      },
      options
    );

    console.log(`User ${user.clerkId} saved to database`);
    return user;
  } catch (error) {
    console.error("Error saving user to database:", error);
    throw error;
  }
};

export const getUserById = async (clerkId) => {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const deleteUser = async (clerkId) => {
  try {
    await connectToDB();
    
    // Soft delete approach (recommended)
    const deletedUser = await User.findOneAndUpdate(
      { clerkId },
      {
        $set: {
          isActive: false,
          deleted: true,
          deletedAt: new Date()
        }
      },
      { new: true }
    );

    // Alternative: Hard delete
    // const deletedUser = await User.findOneAndDelete({ clerkId });

    if (!deletedUser) {
      throw new Error("User not found");
    }

    console.log(`User ${clerkId} marked as deleted`);
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};