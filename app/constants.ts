// export const serviceURL = "http://localhost:3010";

export const timers: number[] = [
  12, 24, 72, 120, 168, 360, 540, 720, 900, 1080, 1260,
];

export const getNow = () => {
  const now = new Date();
  now.setMilliseconds(0);
  return now;
};

export const serviceURL: string =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3010"
    : "/api";
