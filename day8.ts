const inputs = (await Deno.readTextFile('./inputs/8.txt')).split('\n')

const rows = inputs.map(r => r.split(''));

const calcVisibleTrees = (tree: number, arr: number[]): number => {
    let score = 0;

    const trees = [...arr]
    const firstTree = tree;
    for(let i = 0; i < trees.length ; i++) {
        const currentTree = trees[i];
        if(currentTree >= firstTree) {
            score++;
            return score
        }
        score++;
    }

    return score;
}

const scoreLeft = (index: number, arr: string[]) => {
    const leftTrees = arr.slice(0, index).map(t => +t).reverse();
    const tree = +arr[index]
    return calcVisibleTrees(tree, leftTrees);
    
}
const scoreRight = (index: number, arr: string[]) => {
    const rightTrees = arr.slice(index + 1).map(t => +t)
    const tree = +arr[index]
    return calcVisibleTrees(tree, rightTrees); 
}


const getColumnColumn = (treei: number) => {
    return rows.map(row => row[treei]);
}

const treeScores = rows.map((row, rowIndex, arr) => {
    const scores = row.map((tree, treeIndex, row) => {
        const column = getColumnColumn(treeIndex);
        const left = scoreLeft(treeIndex, row);
        const right = scoreRight(treeIndex, row);
        const top = scoreLeft(rowIndex, column);
        const bottom = scoreRight(rowIndex, column);
        const score = left * right * top * bottom
        return score;
    })

    return Math.max(...scores);
})

console.log(Math.max(...treeScores))


