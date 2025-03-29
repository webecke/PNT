export function parseDate(rawDate: string) {
  const maybeTimestamp = Date.parse(rawDate);  // If empty or invalid, Date.parse() returns NaN
  if (!maybeTimestamp) {
    throw new Error("Invalid or missing date");
  }
  return new Date(rawDate);
}
