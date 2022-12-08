const inputs = (await Deno.readTextFile('./inputs/8.txt')).split('\n')

const rows = inputs.map(r => r.split(''));


const isVisibleLeft = (index: number, arr: string[]) => {
    const leftTrees = arr.slice(0, index).map(t => +t)
    return Math.max(...leftTrees) < +arr[index]
}
const isVisibleRight = (index: number, arr: string[]) => {
    const rightTrees = arr.slice(index + 1).map(t => +t)
    return Math.max(...rightTrees) < +arr[index]
}


const getColumnColumn = (treei: number) => {
    return rows.map(row => row[treei]);
}

const visibleTrees = rows.reduce((acc, row, rowIndex, arr) => {
    const visibleTreesInrow = row.reduce((acc, tree, treeIndex, row) => {
        const column = getColumnColumn(treeIndex);
        const left = isVisibleLeft(treeIndex, row);
        const right = isVisibleRight(treeIndex, row);
        const top = isVisibleLeft(rowIndex, column);
        const bottom = isVisibleRight(rowIndex, column);

        if(left || right || top || bottom) return acc = acc + 1;

        return acc;
    }, 0)

    return acc = acc + visibleTreesInrow;
}, 0)

console.log(visibleTrees)

