export function findDeficiency(
  deficiency: string,
  defaultValues?: { id: string; name: string }[]
): string {
  if (defaultValues && defaultValues.length > 0) {
    const found = defaultValues.find(
      (val) => val.name.toLowerCase() === deficiency.toLowerCase()
    );
    if (found) return found.name;
  }
  return "";
}
