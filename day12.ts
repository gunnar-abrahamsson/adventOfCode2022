const inputs = (await Deno.readTextFile('./inputs/12.txt')).split('\n').map((row, y) => row.split(''))

const getStartingXY = (inputs: string[][]) => {
    let x = 0;
    let y = 0;
    
    inputs.findIndex((row, i) => {
        if(row.find((char, i) => {
            if(char === 'E') {
                x = i;
                return char
            }
        })) {
            y = i;
            return row
        }
    })
    
    return {x, y}
}

const getValue = (char: string) => {
    if(char === 'S') return 1
    if(char === 'E') return 'z'.charCodeAt(0) - 96
    return char?.charCodeAt(0) - 96;
} 
const visited = new Map<string, string | undefined>();

const toCord = (x: number, y: number) => {
    if (x === undefined || y === undefined) return '';
    return `x${x} y${y}`
}

const isVisited = (node?: string) => {
    return visited.has(`${node}`);
}
type Queue = number[][]

const addToQueue = (queue: Queue, graph: string[][], x: number, y: number, px: number, py: number) => {
    const currentValue = getValue(graph?.[y]?.[x]);
    const prevValue = getValue(graph?.[py]?.[px]);

    if(!(prevValue <= currentValue + 1)) return;
    if(isVisited(toCord(x,y))) return;
    const alreadyInQueue = queue.find((item) => {

        const [ix, iy, ipx, ipy] = item;
        if(x === ix && y === iy && ipx === px && py === ipy) return item

    })
    if(alreadyInQueue) return;
    queue.push([x, y, px, py])   
}

const getNodeValue = (graph: string[][], x: number, y: number) => {
    const value = graph[y][x];
    if(!value) return '';

    return value;
}

const queue: Queue = [];
const BFS = (graph: string[][], root: {x: number; y: number}) => {
    queue.push([root.x, root.y]);
    while (queue.length > 0) {
        const current = queue.shift();
        if(!current) throw new Error('empty queue');
        const [x, y, px, py] = current;

        const nodeValue = getNodeValue(graph, x, y);
        if(getValue(nodeValue) === 1) return current;
        visited.set(toCord(x, y), toCord(px, py));

        // right
        addToQueue(queue, graph, x + 1, y, x, y);
        // left
        addToQueue(queue, graph, x - 1, y, x, y);
        // top
        addToQueue(queue, graph, x, y + 1, x, y);
        // bottom
        addToQueue(queue, graph, x, y - 1, x, y);
    
    }
}

const getRange = () => {
    let range = 0;
    const destination = BFS(inputs, getStartingXY(inputs))
    if(!destination) throw new Error('no destination')
    const [x, y, px, py] =  destination
    let next: string | undefined = toCord(px, py);
    while (next?.length) {
        if(!next) return range;
        range = range + 1;
        next = visited.get(next)
    }

    return range
}

console.log(getRange())