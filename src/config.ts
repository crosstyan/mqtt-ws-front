
const host = document.location.hostname;
const port = 8080
export const config = {
  addr: `${host}:${port}`,
  wsPath: "/ws",
  tmpPath: "/temperature",
  hmdPath: "/humidity",
}