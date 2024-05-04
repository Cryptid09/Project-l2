import bcrypt from 'bcrypt';
import { connectToDb } from "./utils";

import { User } from "./models";

connectToDb(); 

export async function verifyUser(email, password) {
  try {
    
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User not found');
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Password is incorrect');
    }


    return { status: 'success', message: 'User verified', user };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}


export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const result = await verifyUser(email, password);
    res.status(200).json(result);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
