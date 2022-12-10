const inputs = (await Deno.readTextFile('./inputs/10.txt')).split('\n')
const commands = inputs.flatMap((input) => input.split(' '))

let x = 1;

const commandCycles: string[][] = []
for (let i = 0; i < commands.length; i = i + 40) {
    commandCycles.push(commands.slice(i, i + 40))
}

const images = commandCycles.map(comands => comands.map((command, cycle) => {
    // start
    let image = '.'
    //during
    const range = Math.abs(x - cycle);

    //draw
    if(range <= 1) {
        image = '#'
    }

    //end
    if(+command) {
        x = x + +command;
    }

    return image
}))

images.forEach(async image => {
    const message = image.join('');
    await Deno.stdout.write(new TextEncoder().encode(message + '\n'))
})