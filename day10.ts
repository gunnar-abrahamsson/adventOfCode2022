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

const write = (char: string) => {
    return new Promise((resolve) => {
        Deno.stdout.write(new TextEncoder().encode(char)).then(() => {
            setTimeout(() => {
                resolve(char)
            }, 50)
        }) 
    })
}


for (const image in images) {
    for ( const char in images[image]) {
        await write(images[image][char])
    }
    await Deno.stdout.write(new TextEncoder().encode('\n'))
}
