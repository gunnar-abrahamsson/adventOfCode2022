const input = await Deno.readTextFile('./inputs/2.1.txt')
// const input = `A Y
// B X
// C Z`
enum Elf {
    stone = 'A',
    paper = 'B',
    scissors = 'C',
}

enum Me {
    stone = 'X',
    paper = 'Y',
    scissors = 'Z',
}

enum round {
    win = 6,
    draw = 3,
    loss = 0
}

enum shape {
    stone = 1,
    paper = 2,
    scissors = 3,
}
const inputs = input.split('\n');


const calcScore = (elf: string, me: string) => {
    if (elf === Elf.paper && me === Me.paper) {
        return round.draw + shape.paper
    }
    if (elf === Elf.stone && me === Me.stone) {
        return round.draw + shape.stone
    }
    if (elf === Elf.scissors && me === Me.scissors) {
        return round.draw + shape.scissors
    }
    
    if (me === Me.stone && elf === Elf.paper) {
        return round.loss + shape.stone
    }

    if (me === Me.stone && elf === Elf.scissors) {
        return round.win + shape.stone
    }

    if (me === Me.paper && elf === Elf.scissors) {
        return round.loss + shape.paper
    }
    if (me === Me.paper && elf === Elf.stone) {
        return round.win + shape.paper
    }
  
    if (me === Me.scissors && elf === Elf.paper) {
        return round.win + shape.scissors
    }
    if (me === Me.scissors && elf === Elf.stone) {
        return round.loss + shape.scissors
    }
    throw new Error('Aj aj')
}

const score = inputs.reduce((acc, curr) => {
    const [elf, me] = curr.split(' ')
    if(!elf) return acc;
    return acc + calcScore(elf, me);
}, 0)

console.log(score)

// const
