export function removeAtSymbol(usernames: string[]): string[] {
    return usernames.map((username) => username.replace(/^@/, ""));
}
