const inputs = (await Deno.readTextFile('./inputs/9.txt')).split('\n')
//       X  Y
const prevH = [0, 0]
const H = [0, 0]
const T = [0, 0]

const tailPositions = new Set<string>();
tailPositions.add('x0y0')

const moveTail = () => {
    if((T[0] - H[0]) > 1 || (T[0] - H[0]) < -1 ) {
        T[0] = prevH[0]
        T[1] = prevH[1]
        tailPositions.add(`x${T[0]}y${T[1]}`)
    }
    if((T[1] - H[1]) > 1 || (T[1] - H[1]) < -1 ) {
        T[0] = prevH[0]
        T[1] = prevH[1]
        tailPositions.add(`x${T[0]}y${T[1]}`)
    }
}

const moveHUp = () => {
    H[1] = H[1] + 1
    moveTail();
    prevH[1] = prevH[1] + 1;
}
const moveHDown = () => {
    H[1] = H[1] - 1
    moveTail();
    prevH[1] = prevH[1] - 1;
}
const moveHRight = () => {
    H[0] = H[0] + 1
    moveTail();
    prevH[0] = prevH[0] + 1;
}
const moveHLeft = () => {
    H[0] = H[0] - 1
    moveTail();
    prevH[0] = prevH[0] - 1;
}

inputs.forEach((input) => {
    const [direction, step] = input.split(' ');

    for (let i = 0; i < +step; i++) {
        switch(direction) {
            case 'U': moveHUp();
            break;
            case 'R': moveHRight();
            break;
            case 'D': moveHDown();
            break;
            case 'L': moveHLeft();
            break;
        }
    }
})

console.log(tailPositions.size)