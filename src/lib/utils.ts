export function derive<T>(cb: () => T extends void ? never : T) {
    return cb();
}

export function run(cb: () => void) {
    return cb();
}
