
import { connectToDb } from "@/lib/utils";
import { Post } from "@/lib/models";

export async function GET(request) {
  try {
    await connectToDb();
    const posts = await Post.find();
    return new Response(JSON.stringify(posts), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const id = formData.get('id');
  try {
    await connectToDb();
    await Post.findByIdAndDelete(id);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
