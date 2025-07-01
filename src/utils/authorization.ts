export function isCommonUser(accessType: string) {
  return accessType.toUpperCase() === "USER";
}

export function isAdmin(accessType: string) {
  return accessType.toUpperCase() === "ADMIN";
}

export function isVisitor(accessType: string) {
  return accessType.toUpperCase() === "VISITOR";
}
