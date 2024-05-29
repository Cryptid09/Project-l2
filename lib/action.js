
"use server";
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcryptjs";
import { signOut } from "next-auth/react";

export const addPost = async (prevState, formData) => {
  if (!(formData instanceof FormData)) {
    console.error("Invalid formData type");
    return { error: "Expected formData to be of type FormData" };
  }

  const { title, desc, slug, userId, img } = Object.fromEntries(formData.entries());

  try {
    await connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      img,
      userId,
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/cases");
    revalidatePath("/admin");
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  if (!(formData instanceof FormData)) {
    console.error("Invalid formData type");
    return { error: "Expected formData to be of type FormData" };
  }

  const { id } = Object.fromEntries(formData.entries());

  try {
    await connectToDb();
    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/cases");
    revalidatePath("/admin");
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState, formData) => {
  if (!(formData instanceof FormData)) {
    console.error("Invalid formData type");
    return { error: "Expected formData to be of type FormData" };
  }

  const { username, email, password, img } = Object.fromEntries(formData.entries());

  try {
    await connectToDb();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  if (!(formData instanceof FormData)) {
    console.error("Invalid formData type");
    return { error: "Expected formData to be of type FormData" };
  }

  const { id } = Object.fromEntries(formData.entries());

  try {
    await connectToDb();
    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong!" };
  }
};

export const handleLogout = async () => {
  try {
    await signOut();
  } catch (err) {
    console.error(err);
    return { error: "Logout failed!" };
  }
};

export const register = async (previousState, formData) => {
  if (!(formData instanceof FormData)) {
    console.error("Invalid formData type");
    return { error: "Expected formData to be of type FormData" };
  }

  const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData.entries());

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    await connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong!" };
  }
};
