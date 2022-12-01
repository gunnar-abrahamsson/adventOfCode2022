const input = await Deno.readTextFile('./inputs/1.1.txt')
const inputs = input.split('\n\n');
const elfs = inputs.map(input => input.split('\n'))
const maxCals = elfs.map(elf => elf.reduce((acc, curr) => {
    return acc + +curr;
}, 0))
// console.log(elfs);
// console.log(maxCals);
const max = Math.max(...maxCals)
const elf = maxCals.indexOf(max);
// console.log(max);
// console.log(elf + 1);


const sorted = maxCals.sort((a, b) => b - a);

const total = sorted[0] + sorted[1] + sorted [2];

console.log(sorted);
console.log(total);
