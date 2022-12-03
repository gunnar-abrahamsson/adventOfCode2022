const input = await Deno.readTextFile('./inputs/3.txt')
const inputs = input.split('\n');


const p1 = (inputs: string[]) => {

    const matchingItems = inputs.reduce<string[]>((acc, curr) => {
        
        const firstHalf = curr.slice(0, curr.length / 2).split('')
        const secondHalf = curr.slice(curr.length / 2).split('')
        const matching = new Set(firstHalf.filter(letter => secondHalf.includes(letter)));
        return [...acc, ...matching]
    }, [])
    return matchingItems.reduce((acc, curr) => {
        //lower
        const value = curr.charCodeAt(0);
        if(value > 96) {
            return acc + value - 96
        }
        return acc + value - 38
    }, 0)
}

const p2 = (inputs: string[]) => {
    const matchingBadges: string[] = []

    for(let i = 0; i < inputs.length; i = i + 3) {
        const group1 = inputs[i].split('')
        const group2 = inputs[i + 1].split('')
        const group3 = inputs[i + 2].split('')

        const matchingBadge = group1.find(item => {
            return group2.includes(item) && group3.includes(item)
        }) || '';
        matchingBadges.push(matchingBadge);
    }

    return matchingBadges.reduce((acc, curr) => {
        //lower
        const value = curr.charCodeAt(0);
        if(value > 96) {
            return acc + value - 96
        }
        return acc + value - 38
    }, 0)
}

console.log(p2(inputs))