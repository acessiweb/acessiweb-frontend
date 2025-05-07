export function isCommonUser(accessType: string) {
  return accessType === "USER";
}

export function isAdmin(accessType: string) {
  return accessType === "ADMIN";
}

export function isVisitor(accessType: string) {
  return accessType === "VISITOR";
}
