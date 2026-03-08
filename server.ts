import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import multer from "multer";
import fs from "fs";
import db from "./database.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  // Static files for uploads
  app.use("/uploads", express.static(uploadsDir));

  // Multer configuration
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });

  // API Routes
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "brain" && password === "marvin") {
      res.json({ success: true, token: "fake-jwt-token" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.get("/api/admin/profile", (req, res) => {
    try {
      const profilePic = db.prepare("SELECT value FROM admin_settings WHERE key = 'profile_pic'").get() as any;
      res.json({ profile_pic: profilePic?.value });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  app.post("/api/admin/profile-pic", upload.single("image"), (req, res) => {
    try {
      let imageUrl = req.body.imageUrl;
      if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
      }
      
      if (!imageUrl) return res.status(400).json({ error: "No image provided" });

      db.prepare("UPDATE admin_settings SET value = ? WHERE key = 'profile_pic'").run(imageUrl);
      res.json({ success: true, imageUrl });
    } catch (error) {
      res.status(500).json({ error: "Failed to update profile pic" });
    }
  });

  app.get("/api/products", (req, res) => {
    try {
      const products = db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", (req, res) => {
    try {
      const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", upload.single("image"), (req, res) => {
    try {
      const { name, price, description, category } = req.body;
      let imageUrl = req.body.imageUrl || ""; // Fallback if no file uploaded but URL provided

      if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
      }

      const info = db.prepare(
        "INSERT INTO products (name, price, description, image_url, category) VALUES (?, ?, ?, ?, ?)"
      ).run(name, parseFloat(price), description, imageUrl, category);

      res.status(201).json({ id: info.lastInsertRowid, name, price, description, image_url: imageUrl, category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", upload.single("image"), (req, res) => {
    try {
      const { name, price, description, category } = req.body;
      const id = req.params.id;
      
      let product = db.prepare("SELECT * FROM products WHERE id = ?").get(id) as any;
      if (!product) return res.status(404).json({ error: "Product not found" });

      let imageUrl = product.image_url;
      if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
      } else if (req.body.imageUrl) {
        imageUrl = req.body.imageUrl;
      }

      db.prepare(
        "UPDATE products SET name = ?, price = ?, description = ?, image_url = ?, category = ? WHERE id = ?"
      ).run(name, parseFloat(price), description, imageUrl, category, id);

      res.json({ id, name, price, description, image_url: imageUrl, category });
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", (req, res) => {
    try {
      db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
