const inputs = (await Deno.readTextFile('./inputs/9.txt')).split('\n')
//       X  Y
const amountOfKnots = 10;
const knots = [...Array(amountOfKnots).keys()].map(() => [0, 0]);
const tailPositions = new Set<string>();
tailPositions.add('x0y0')

const getFollowersNewPosition = (leadX:number, leadY:number, followX: number, followY: number) => {
    const distance = Math.max(Math.abs(leadX - followX), Math.abs(leadY - followY))
    if(distance > 1) {
        const deg = Math.atan2(leadY - followY, leadX - followX) * 180 / Math.PI + 180; 
        if(deg === 0) {
            return [followX - 1, followY]
        }
        if(0 < deg && deg < 90) return [followX - 1, followY - 1]
        if(deg === 90) {
            return [followX, followY - 1]
        }
        if(90 < deg && deg < 180) return [followX + 1, followY - 1]
        if(deg === 180) {
            return [followX + 1, followY]
        }
        if(180 < deg && deg < 270) return [followX + 1, followY + 1]
        if(deg === 270) {
            return [followX, followY + 1]
        }
        if(270 < deg && deg < 360) return [followX - 1, followY + 1]
        if(deg === 360) return [followX - 1, followY]
    }
    return [followX, followY]
}

const moveHUp = (x: number, y:number) => {
    return [x, y + 1]
}
const moveHDown = (x: number, y:number) => {
    return [x, y - 1]
}
const moveHRight = (x: number, y:number) => {
    return [x + 1, y]
}
const moveHLeft = (x: number, y:number) => {
    return [x - 1, y ]
}

const moveKnots = (knots: number[][], moveFn: (x: number, y: number) => number[]) => {
    const [x, y] = knots.reduce((acc, curr, i, arr) => {
        if(i === 0) {
            const [x, y] = moveFn(curr[0], curr[1])
            curr[0] = x;
            curr[1] = y;
            return curr;
        }
        const [x, y] = getFollowersNewPosition(acc[0], acc[1], curr[0], curr[1]);
        curr[0] = x;
        curr[1] = y;
        return curr;
    }, [0, 0])
    tailPositions.add(`x${x}y${y}`)
}
inputs.forEach((input) => {
    const [direction, step] = input.split(' ');

    for (let i = 0; i < +step; i++) {
        switch(direction) {
            case 'U': {
                moveKnots(knots, moveHUp) 
            }
            break;
            case 'R': {
                moveKnots(knots, moveHRight) 
            }
            break;
            case 'D': {
                moveKnots(knots, moveHDown) 
            }
            break;
            case 'L': {
                moveKnots(knots, moveHLeft) 
            }
            break;
        }
    }
})

console.log(tailPositions.size)