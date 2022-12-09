const inputs = (await Deno.readTextFile('./inputs/9.txt')).split('\n')
//       X  Y
const H = [0, 0]
const T = [0, 0]

const tailPositions = new Set<string>();
tailPositions.add('x0y0')

const moveTail = (x:number, y:number) => {
    const distance = Math.max(Math.abs(T[0] - H[0]), Math.abs(T[1] - H[1]))
    if(distance > 1) {
        T[0] = x
        T[1] = y
        tailPositions.add(`x${T[0]}y${T[1]}`)
    }
}

const moveHUp = (x: number, y:number) => {
    H[1] = y + 1
    moveTail(x, y);
}
const moveHDown = (x: number, y:number) => {
    H[1] = y - 1
    moveTail(x, y);
}
const moveHRight = (x: number, y:number) => {
    H[0] = x + 1
    moveTail(x, y);
}
const moveHLeft = (x: number, y:number) => {
    H[0] = x - 1
    moveTail(x, y);
}

inputs.forEach((input) => {
    const [direction, step] = input.split(' ');

    for (let i = 0; i < +step; i++) {
        const [x, y] = H
        switch(direction) {
            case 'U': moveHUp(x, y);
            break;
            case 'R': moveHRight(x, y);
            break;
            case 'D': moveHDown(x, y);
            break;
            case 'L': moveHLeft(x, y);
            break;
        }
    }
})

console.log(tailPositions.size)