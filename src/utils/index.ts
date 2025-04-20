import { format, isToday, isYesterday } from "date-fns";
export function removeAtSymbol(usernames: string[]): string[] {
    return usernames.map((username) => username.replace(/^@/, ""));
}

export const formatMessageTime = (
    timestamp: string | number | Date
): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / 1000 / 60;

    if (diffInMinutes < 1) {
        return "just now";
    } else if (diffInMinutes < 60) {
        const minutes = Math.floor(diffInMinutes);
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (diffInMinutes < 1440) {
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (isYesterday(date)) {
        return "Yesterday";
    } else if (!isToday(date)) {
        return format(date, "dd/MM/yyyy");
    } else {
        return format(date, "HH:mm");
    }
};
