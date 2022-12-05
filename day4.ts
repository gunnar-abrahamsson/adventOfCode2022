const input = await Deno.readTextFile('./inputs/4.txt')
const inputs = input.split('\n');

const pairs = inputs.map(i => i.split(','));

const fullyContains = pairs.reduce((acc, curr) => {
    const [pair1Start, pair1End] = curr[0].split('-').map(p => +p)
    const [pair2Start, pair2End] = curr[1].split('-').map(p => +p)
  
    if(pair1Start <= pair2Start && pair1End >= pair2Start ) {
        return acc = acc + 1;
    }
    if(pair1Start <= pair2End && pair1End >= pair2End ) {
        return acc = acc + 1;
    }
    if(pair2Start <= pair1Start && pair2End >= pair1Start ) {
        return acc = acc + 1;
    }
    if(pair2Start <= pair1End && pair2End >= pair1End ) {
        return acc = acc + 1;
    }
    return acc;
}, 0)
console.log(fullyContains);