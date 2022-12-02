const input = await Deno.readTextFile('./inputs/2.1.txt')

enum Expected {
    loss = 'X',
    draw = 'Y',
    win = 'Z',
}

enum Round {
    win = 6,
    draw = 3,
    loss = 0
}

enum Shape {
    stone = 1,
    paper = 2,
    scissors = 3,
}
const inputs = input.split('\n');

const getShape = (input: string) => {
    switch(input) {
        case 'A': {
            return Shape.stone
        }
        case 'B': {
            return Shape.paper
        }
        case 'C': {
            return Shape.scissors
        }
        default: {
            throw new Error('invalid shape ' + input)
        }
    }
}

const decrypt = (shape: Shape, expected: string) => {

    if(expected === Expected.draw) {
        return shape;
    }

    if (expected === Expected.win) {
        switch(shape) {
            case Shape.stone: {
                return Shape.paper
            }
            case Shape.scissors: {
                return Shape.stone
            }
            case Shape.paper: {
                return Shape.scissors
            }
        }
    }
    if (expected === Expected.loss) {
        switch(shape) {
            case Shape.stone: {
                return Shape.scissors
            }
            case Shape.scissors: {
                return Shape.paper
            }
            case Shape.paper: {
                return Shape.stone
            }
        }
    }

    throw new Error('Invalid decrtpyt ' + shape + expected)
}

const calcScore = (elf: string, expected: string) => {
    if(expected === Expected.draw) {
        return decrypt(getShape(elf), expected) + Round.draw
    }
    if(expected === Expected.loss) {
        return decrypt(getShape(elf), expected) + Round.loss
        
    }
    if(expected === Expected.win) {
        return decrypt(getShape(elf), expected) + Round.win

    }
    throw new Error(`invalid calc', ${elf}, ${expected}`)
}

const score = inputs.reduce((acc, curr) => {
    const [elf, me] = curr.split(' ')
    if(!elf || !me) return acc;
    return acc + calcScore(elf, me);
}, 0)

console.log(score)

