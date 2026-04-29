import { getDay } from "date-fns";

export function getDayOrNightIcon(
  iconName: string,
  dateTimeString: string,
): string {
  const hours = new Date(dateTimeString).getHours();
  const isDayTime = hours >= 6 && hours < 18; // Define day time as between 6 AM and 6 PM
  return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}
