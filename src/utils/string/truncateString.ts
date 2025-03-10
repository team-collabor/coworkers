function truncateString(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    return `${str.substring(0, maxLength)}…`;
  }
  return str;
}

export default truncateString;
