// import express from "express";
// import session from "express-session";
// import { dirname, join } from "path";
// import { fileURLToPath } from "url";

// import passport from "./config/passport.js";

// // Recreate __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Session configuration
// app.use(
//   session({
//     secret: "your-secret-key-change-in-production",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false, // Set to true in production with HTTPS
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     },
//   })
// );

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/", express.static("../frontend/dist"));

// app.get("*splat", function (req, res) {
//   res.sendFile("index.html", {
//     root: join(__dirname, "../frontend/dist"),
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import session from "express-session";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import passport from "./config/passport.js";
// import { connectToMongo } from "./config/mongo.js";
import authRoutes from "./routes/auth.js";
// import booksRoutes from "./routes/books.js";
// import reviewsRoutes from "./routes/reviews.js";

dotenv.config();

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret:
      process.env.SESSION_SECRET || "your-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use("/api/auth", authRoutes);
// app.use("/api/books", booksRoutes);
// app.use("/api/reviews", reviewsRoutes);

// Optional health check
app.get("/api", (_req, res) => {
  res.json({ message: "Second-Shelf API is running" });
});

// Serve frontend build
app.use("/", express.static(join(__dirname, "../frontend/dist")));

// Catch-all for React Router
app.get("*splat", (_req, res) => {
  res.sendFile("index.html", {
    root: join(__dirname, "../frontend/dist"),
  });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// async function startServer() {
//   try {
//     await connectToMongo();
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error);
//     process.exit(1);
//   }
// }

// startServer();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
