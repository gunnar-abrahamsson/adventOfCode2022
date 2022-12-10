const inputs = (await Deno.readTextFile('./inputs/10.txt')).split('\n')
const commands = inputs.flatMap((input) => input.split(' '))

let x = 1;
let cycle = 0;
const cycles = [20, 60, 100, 140, 180, 220];

let total = 0;
commands.forEach((command) => {
    ++cycle;
    if(cycles.includes(cycle)) {
        total = total + (x * cycle);
    }
    if(+command) {
        x = x + +command;
    }
})
console.log(total);