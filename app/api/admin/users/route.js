import { connectToDb } from "@/lib/utils";
import { User } from "@/lib/models";

export async function GET(request) {
  try {
    await connectToDb();
    const users = await User.find();
    return new Response(JSON.stringify(users), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
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
    await User.findByIdAndDelete(id);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

