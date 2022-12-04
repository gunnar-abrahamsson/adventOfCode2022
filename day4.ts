const input = await Deno.readTextFile('./inputs/4.txt')
const inputs = input.split('\n');

const pairs = inputs.map(i => i.split(','));

const fullyContains = pairs.reduce((acc, curr) => {
    const [pair1Start, pair1End] = curr[0].split('-')
    const [pair2Start, pair2End] = curr[1].split('-')

    if(+pair1Start <= +pair2Start && +pair1End >= +pair2End) {
        return acc = acc + 1;
    }
    if(+pair2Start <= +pair1Start && +pair2End >= +pair1End) { 
        return acc = acc + 1
    }
    return acc;
}, 0)
console.log(fullyContains);