export function formatEpochMinutes(epochMinutes: number): string {
  const inputDate = new Date(epochMinutes * 60 * 1000);
  const now = new Date();

  const inputDateMidnight = new Date(inputDate);
  inputDateMidnight.setHours(0, 0, 0, 0);

  const todayMidnight = new Date(now);
  todayMidnight.setHours(0, 0, 0, 0);

  const diffInDays =
    (todayMidnight.getTime() - inputDateMidnight.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffInDays === 0) {
    const hours = inputDate.getHours().toString().padStart(2, "0");
    const minutes = inputDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else {
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const year = inputDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
