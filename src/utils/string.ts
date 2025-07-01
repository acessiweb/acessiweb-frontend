export function capitalize(text: string) {
  const firstLetter = text.charAt(0).toUpperCase();
  const rest = text.slice(1, text.length).toLowerCase();

  return `${firstLetter}${rest}`;
}
