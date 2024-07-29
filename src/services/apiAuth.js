import supabase, { supabaseUrl } from "./supabase"; // Import the supabase instance and the supabase URL from the supabase configuration file

// Function to sign up a new user
export async function signup({ fullName, email, password }) {
  // Use Supabase's signUp method to create a new user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "", // Initially set the avatar to an empty string
      },
    },
  });

  // If there's an error, throw a new error with the error message
  if (error) throw new Error(error.message);

  // Return the user data if signup is successful
  return data;
}

// Function to log in an existing user
export async function login({ email, password }) {
  // Use Supabase's signInWithPassword method to authenticate the user
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // If there's an error, throw a new error with the error message
  if (error) throw new Error(error.message);

  // Return the user data if login is successful
  return data;
}

// Function to get the currently authenticated user
export async function getCurrentUser() {
  // Get the current session from Supabase
  const { data: session } = await supabase.auth.getSession();
  // If there is no session, return null
  if (!session.session) return null;

  // Get the current user information from Supabase
  const { data, error } = await supabase.auth.getUser();

  // If there's an error, throw a new error with the error message
  if (error) throw new Error(error.message);

  // Return the user data
  return data?.user;
}

// Function to log out the current user
export async function logout() {
  // Use Supabase's signOut method to log out the user
  const { error } = await supabase.auth.signOut();

  // If there's an error, throw a new error with the error message
  if (error) throw new Error(error.message);
}

// Function to update the current user's information
export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  // Prepare the data to update the user's password or full name
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  // Update the user's information using Supabase's updateUser method
  const { data, error } = await supabase.auth.updateUser(updateData);

  // If there's an error, throw a new error with the error message
  if (error) throw new Error(error.message);

  // If there's no avatar to update, return the updated user data
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`; // Generate a unique file name for the avatar

  // Upload the avatar to Supabase's storage
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  // If there's an error during the upload, throw a new error with the error message
  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user profile
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`, // Set the URL of the uploaded avatar
    },
  });

  // If there's an error while updating the user profile, throw a new error with the error message
  if (error2) throw new Error(error2.message);

  // Return the updated user data
  return updatedUser;
}
