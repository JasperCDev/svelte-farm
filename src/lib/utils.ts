export function derive<T>(cb: () => T extends void ? never : T) {
    return cb();
}

export function run(cb: () => void) {
    return cb();
}

export function moveTowards(x: number, y: number, targetX: number, targetY: number, speed: number) {
    const dx = targetX - x;
    const dy = targetY - y;
    const dist = Math.hypot(dx, dy);

    if (dist < speed) {
        return { x: targetX, y: targetY };
    }

    const nx = dx / dist;
    const ny = dy / dist;

    return {
        x: x + nx * speed,
        y: y + ny * speed,
    };
}
