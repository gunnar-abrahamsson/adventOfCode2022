const input = await Deno.readTextFile('./inputs/6.txt')

let answer = 0;
for(let i = 0; i < input.length; i++) {
    const set = new Set(input.slice(i, i+4).split(''))

    if(set.size === 4) {
        answer = i + 4;
        break;
    };
}

console.log(answer)