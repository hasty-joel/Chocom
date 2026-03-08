export default function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (username === "brain" && password === "chocom") {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false });
}