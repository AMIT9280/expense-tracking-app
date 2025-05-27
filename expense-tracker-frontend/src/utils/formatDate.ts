export function formatDate(inputDate: string | Date): string {
  const date = new Date(inputDate);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export const getTodayDate = (): string => {
  return new Date().toISOString().split("T")[0];
};
