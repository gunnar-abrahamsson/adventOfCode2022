const input = await Deno.readTextFile('./inputs/3.txt')
const inputs = input.split('\n');



const matchingItems = inputs.reduce<string[]>((acc, curr) => {
    
    const firstHalf = curr.slice(0, curr.length / 2).split('')
    const secondHalf = curr.slice(curr.length / 2).split('')
    const matching = new Set(firstHalf.filter(letter => secondHalf.includes(letter)));
    return [...acc, ...matching]
}, [])
const total = matchingItems.reduce((acc, curr) => {
    //lower
    const value = curr.charCodeAt(0);
    if(value > 96) {
        return acc + value - 96
    }
    return acc + value - 38
}, 0)

console.log(matchingItems)
console.log(total)