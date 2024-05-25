
import { generateCsrfToken } from "@/lib/utils";

export default async function handler(req, res) {
  try {
 
    const csrfToken = generateCsrfToken(); 

    res.status(200).json({ csrfToken });
  } catch (error) {
    console.error('Failed to generate CSRF token:', error);
    res.status(500).json({ error: 'Failed to generate CSRF token' });
  }
}
