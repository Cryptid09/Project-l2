"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (prevState, formData) => {

};

export const deletePost = async (formData) => {
 
};

export const addUser = async (prevState, formData) => {

};

export const deleteUser = async (formData) => {
  
};



export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
 
};

export const login = async (prevState, formData) => {

};
