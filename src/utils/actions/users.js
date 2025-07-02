import User from "@/models/user.model";
import { connectToDB } from "@/lib/mongodb/connection";

export const createOrUpdateUser = async ({
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
}) => {
  try {
    await connectToDB();

    // Find primary email
    const primaryEmail =
      email_addresses.find(
        (email) => email.id === evt.data.primary_email_address_id
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
