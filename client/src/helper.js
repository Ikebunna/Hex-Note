export const backendUrl =
  process.env.NODE_ENV === "production"
    ? "https://noteapp-two.onrender.com"
    : "http://localhost:5000";
