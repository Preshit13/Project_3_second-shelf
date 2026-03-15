// import express from "express";
// import bcrypt from "bcrypt";
// import passport from "passport";

// import { isAuthenticated } from "../middleware/auth.js";

// import { findUserByEmail, createUser } from "../models/users.js";

// const router = express.Router();

// // Register endpoint
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password, name } = req.body;

//     // Validation
//     if (!email || !password || !name) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     const existingUser = findUserByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = createUser({
//       email,
//       passwordHash: hashedPassword,
//       name,
//     });

//     // Don't send password back
//     delete user.password;

//     res.status(201).json({
//       message: "User created successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = findUserByEmail(email);
// //     if (!user) {
// //       return res.status(401).json({ message: "Invalid email or password" });
// //     }

// //     //verify password
// //     const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
// //     if (!isPasswordValid) {
// //       return res.status(401).json({ message: "Invalid email or password" });
// //     }

// //     delete user.passwordHash; // Remove password hash before sending user data

// //     res.status(200).json({ message: "Login successful", user });
// //   } catch (error) {
// //     console.error("Error during login:", error);
// //     res
// //       .status(500)
// //       .json({ message: "Internal server error", error: error.message });
// //   }
// // });

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login?msg='Invalid credentials'",
//   })
// );

// // Get current user (protected route)
// router.get("/user", isAuthenticated, (req, res) => {
//   delete req.user.passwordHash;
//   res.json({ user: req.user });
// });

// // Logout endpoint
// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ message: "Logout failed", error: err.message });
//     }
//     // res.json({ message: "Logout successful" });
//     res.redirect("/");
//   });
// });

// export default router;

// import express from "express";
// import passport from "passport";
// import { getDb } from "../config/mongo.js";

// const router = express.Router();

// router.post("/register", async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     const db = getDb();

//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const existingUser = await db.collection("users").findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ error: "Email already registered" });
//     }

//     const result = await db.collection("users").insertOne({
//       name,
//       email,
//       password,
//     });

//     return res.status(201).json({
//       message: "User registered",
//       userId: result.insertedId,
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (error, user, info) => {
//     if (error) {
//       return next(error);
//     }

//     if (!user) {
//       return res.status(401).json({ error: info.message });
//     }

//     return req.login(user, (loginError) => {
//       if (loginError) {
//         return next(loginError);
//       }

//       return res.json({ message: "Logged in", user });
//     });
//   })(req, res, next);
// });

// router.post("/logout", (req, res, next) => {
//   req.logout((error) => {
//     if (error) {
//       return next(error);
//     }

//     return res.json({ message: "Logged out" });
//   });
// });

// router.get("/me", (req, res) => {
//   if (!req.user) {
//     return res.status(401).json({ user: null });
//   }

//   return res.json({ user: req.user });
// });

// export default router;

// /////temp for testing routes/////
// import express from "express";

// const router = express.Router();

// router.get("/", (_req, res) => {
//   res.json({ message: "Auth route is working" });
// });

// router.get("/me", (req, res) => {
//   res.json({
//     authenticated: false,
//     user: req.user || null,
//   });
// });

// export default router;

////Temp for routes

import express from "express";
import passport from "passport";

import { createUser, getAllUsers } from "../data/users.js";

const router = express.Router();

// register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await createUser({ name, email, password });

    res.status(201).json({
      message: "User created",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// login
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    message: "Login successful",
    user: req.user,
  });
});

// logout
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.json({ message: "Logged out" });
  });
});

// current user
router.get("/me", (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user || null,
  });
});

// debug
router.get("/users", (_req, res) => {
  res.json(getAllUsers());
});

export default router;
