import jwt from "jsonwebtoken";

// In-memory user store (replace with DB in production)
const users = [];

export async function POST(req) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email and password required" }),
      { status: 400 }
    );
  }
  if (users.find((u) => u.email === email)) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 409,
    });
  }
  users.push({ email, password });
  const token = jwt.sign({ email }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h",
  });
  return new Response(JSON.stringify({ token }), { status: 201 });
}
