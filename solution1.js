// Javascript code to implement the
// matrix chain multiplication using recursion

function matrixChainOrder(p , i , j)
{
    if (i === j)
        return { minMultiplications: 0, parentheses: `A${i}` };

    let min = Number.MAX_VALUE;
    let parentheses;

    // Place parenthesis at different places
    // between first and last matrix,
    // recursively calculate count of multiplications
    // for each parenthesis placement
    // and return the minimum count
    for (let k = i; k < j; k++)
    {
        const left = matrixChainOrder(p, i, k);
        const right = matrixChainOrder(p, k + 1, j);
        const count = left.minMultiplications + right.minMultiplications + p[i - 1] * p[k] * p[j];

        if (count < min) {
            min = count;
            parentheses = `(${left.parentheses} * ${right.parentheses})`;
        }
    }

    // Return minimum count and optimal parentheses
    return { minMultiplications: min, parentheses };
}

// Driver code
const arr = [10, 5, 7, 20, 8];
const N = arr.length;

const result = matrixChainOrder(arr, 1, N - 1);
console.log(
    "Minimum number of multiplications is " + result.minMultiplications + "\n");
console.log("Optimal Parenthesize is " + result.parentheses);