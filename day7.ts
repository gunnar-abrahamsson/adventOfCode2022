const inputs = (await Deno.readTextFile('./inputs/7.txt')).split('\n')

const maxValue = 100000

let path: string[] = [];

const cd = (value: string) => {
    switch(value) {
        case '/': {
            return path = []
        }
        case '..': {
            return path.pop()
        }
        default: {
            path.push(value)
        }
    }
}

const mapSizes = new Map<string, number>()

inputs.forEach((input, i, array) => {
    const commands = input.split(' ');

    if(commands[0] === '$' && commands[1] === 'cd'){
        cd(commands[2])
        
    }
    if(+commands[0]) {
        const root = mapSizes.get('/')
        mapSizes.set('/', root ? root + +commands[0] : +commands[0])

        path.forEach((folder, i, folders) => {
            const folderName = folders.slice(0, i + 1).join('.');

            const size = mapSizes.get(folderName);
            mapSizes.set(folderName, size? size + +commands[0] : +commands[0])
        })
    };
})
const freeSpace = 70000000 - (mapSizes.get('/') || 0);
const requiredSpace = 30000000
const smallest = [...mapSizes.values()].sort((a, b) => a - b).find(value => (value + freeSpace) > requiredSpace )
console.log(smallest)




