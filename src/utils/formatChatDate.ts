function formatChatDate(epochMinutes: number): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const input = new Date(epochMinutes * 60 * 1000);
  input.setHours(0, 0, 0, 0);

  const diffInDays = Math.floor(
    (today.getTime() - input.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";

  return input.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }); // ex: 16 Jul 2025
}

export default formatChatDate;
