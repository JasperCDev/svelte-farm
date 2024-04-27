export function derive<T>(cb: () => T extends void ? never : T) {
  return cb();
}
