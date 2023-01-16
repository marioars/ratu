const dev = process.env.NODE_ENV !== "production";
export const server = dev
  ? "https://cms-queen.et.r.appspot.com"
  : "https://cms-queen.et.r.appspot.com";
