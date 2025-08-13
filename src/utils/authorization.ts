export function isCommonUser(accessType: string | undefined) {
  return accessType && accessType.toUpperCase() === "USER";
}

export function isAdmin(accessType: string | undefined) {
  return accessType && accessType.toUpperCase() === "ADMIN";
}

export function isVisitor(accessType: string | undefined) {
  return accessType && accessType.toUpperCase() === "VISITOR";
}
