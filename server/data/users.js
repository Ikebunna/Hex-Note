import bcrypt from "bcryptjs";

export default [
  {
    name: "test8",
    email: "test8@example.com",
    password: bcrypt.hashSync("password"),
    isAdmin: true,
  },
  {
    name: "test9",
    email: "test9@example.com",
    password: bcrypt.hashSync("password"),
    isAdmin: false,
  },
  {
    name: "test10",
    email: "test10@example.com",
    password: bcrypt.hashSync("password"),
    isAdmin: true,
  },
];
