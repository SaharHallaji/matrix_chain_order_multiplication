function matrixChainOrder(dims) {
    const n = dims.length - 1;
    const m = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0)); // Minimum number of multiplications
    let parentheses;
    for (let len = 2; len <= n; len++) { // Subsequence lengths
        for (let i = 1; i <= n - len + 1; i++) {
            const j = i + len - 1;
            m[i][j] = Infinity;
            for (let k = i; k <= j - 1; k++) {
                const cost = m[i][k] + m[k + 1][j] + dims[i - 1] * dims[k] * dims[j];
                if (cost < m[i][j]) {
                    parentheses =  `(${dims[i-1]} * ${dims[j]} * ${dims[k]} )`;
                    m[i][j] = cost;
                }
                console.log(`m[${i}][${j}] -> ${parentheses}`);
            }
        }
    }

    return { m };
}

// Example usage
const dims = [10, 5, 7, 20, 8];
const { m, s } = matrixChainOrder(dims);
console.log("m matrix:", m);
