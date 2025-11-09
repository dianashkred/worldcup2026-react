export const getFlagPath = (flagPath?: string) =>
  !flagPath ? "" : flagPath.replace(/^\/public/, "");
