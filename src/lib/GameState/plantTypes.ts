export default {
    basic: {
        id: 0,
        name: "basic",
        squares: [{ row: 1, col: 1 }],
        width: 1,
        height: 1,
    },
    bush: {
        id: 1,
        name: "bush",
        squares: [
            { row: 1, col: 1 },
            { row: 2, col: 1 },
            { row: 3, col: 1 },
            { row: 3, col: 2 },
            { row: 3, col: 3 },
        ],
        width: 3,
        height: 3,
    },
} as const;
