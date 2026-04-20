export function omitPassword<T extends { password?: string }>(user: T) {
  const cloned = { ...user };
  delete cloned.password;
  return cloned;
}
