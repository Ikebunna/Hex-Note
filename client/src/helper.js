export const backendUrl =
  process.env.NODE_ENV === "production"
    ? "https://hex-note.onrender.com/"
    : "http://localhost:5000";
