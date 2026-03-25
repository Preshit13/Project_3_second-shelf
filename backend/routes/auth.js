import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../data/users.js";
import { validateUser } from "../utils/validation.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email, and password are required",
      });
    }

    const validationError = validateUser({
      username: name,
      password,
    });

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        error: "Email already registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser({
      name,
      email,
      passwordHash,
    });

    return res.status(201).json({
      message: "User created",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to register user",
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json({
        error: info.message || "Login failed",
      });
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

return res.status(200).json({
  message: "Login successful",
  user: {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  },
});
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    return res.json({ message: "Logged out" });
  });
});

router.get("/me", (req, res) => {
  return res.json({
    authenticated: req.isAuthenticated(),
    user: req.user || null,
  });
});

export default router;
