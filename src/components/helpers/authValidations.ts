export function hasErrors(errors: object): boolean {
  return Object.values(errors).some(Boolean);
}
