import bcrypt from "bcrypt";

let users = [];

// Create user
export async function createUser({ name, email, password }) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash,
  };

  users.push(user);
  return user;
}

// Find user by email
export const findUserByEmail = (email) => {
  return users.find((u) => u.email === email);
};

// Find user by id
export const findUserById = (id) => {
  return users.find((u) => u.id === id);
};

// Get all user
export const getAllUsers = () => {
  return users;
};
