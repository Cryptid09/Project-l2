import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { slug } = params;

  try {
    await connectToDb();
    const post = await Post.findOne({ slug });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch post!" }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { slug } = params;

  try {
    await connectToDb();
    await Post.deleteOne({ slug });
    return NextResponse.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete post!" }, { status: 500 });
  }
};
