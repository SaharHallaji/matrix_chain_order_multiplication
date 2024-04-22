function matrixChainMultiplication(p) {
    const n = p.length - 1;
    const dp = Array.from({ length: n }, () => Array(n).fill({ cost: Infinity, split: null }));

    for (let i = 1; i < n; i++) dp[i][i] = { cost: 0, split: null };

    for (let l = 2; l < n; l++) {
        for (let i = 1; i < n - l + 1; i++) {
            const j = i + l - 1;
            for (let k = i; k < j; k++) {
                const cost = dp[i][k].cost + dp[k + 1][j].cost + p[i - 1] * p[k] * p[j];
                if (cost < dp[i][j].cost) {
                    dp[i][j] = { cost, split: k };
                }
            }
        }
    }

    const buildParenthesization = (i, j) => {
        if (i === j) return `A${i}`;
        const k = dp[i][j].split;
        return (`${buildParenthesization(i, k)} * ${buildParenthesization(k + 1, j)}`);
    };

    return {
        minimumMultiplications: dp[1][n - 1].cost,
        optimalParenthesization: buildParenthesization(1, n - 1),
    };
}

const p = [1, 2, 3, 4, 3];
const result = matrixChainMultiplication(p);
console.log("Minimum multiplications:", result.minimumMultiplications);
console.log("Optimal parenthesization:", result.optimalParenthesization);