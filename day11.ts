const monkeys = (await Deno.readTextFile('./inputs/11.txt')).split('\n\n')
const monkeysMap = new Map<number, {
    items: number[];
    operator: string;
    test: number;
    ifFalse: number;
    ifTrue: number;
    itemsInspected: number;
}>();

const doOperation = (old: number, operatonString: string) => {
    const [_, _1, _2, _3, operator, value] =operatonString.trim().split(' ')
    const valueToUse = value === 'old' ? old : +value;
    switch(operator) {
        case '*': {
            return old * valueToUse
        }
        case '+': {
            return old + valueToUse
        }
        default: {

            throw new Error(`switch error ${operator}`)
        } 
    }

}


monkeys.forEach((text, i) => {
    const [monkey, staringItems, operation, textTest, ifTrue, ifFalse] =  text.split('\n');
    const items = staringItems.match(/\d+/g);
    const test = textTest.match(/\d+/g)?.[0];
    const throwToIfTrue = ifTrue.match(/\d+/g)?.[0];
    const throwToIfFalse = ifFalse.match(/\d+/g)?.[0];

    if(!items || !test || !throwToIfFalse || !throwToIfTrue ) return;
    monkeysMap.set(i, {
        ifFalse: +throwToIfFalse,
        ifTrue: +throwToIfTrue,
        items: items?.map(i => +i),
        operator: operation,
        test: +test,
        itemsInspected: 0,
    })
})

const cycleLenght = [...monkeysMap.values()].reduce((acc, curr, i ) => {
    if(i === 0) {
        return curr.test;
    }
    return acc = acc * curr.test;
}, 0)

for (let i = 1; i <= 10000; i++) {
   
    monkeysMap.forEach((monkey, monkeyI) => {
        while(monkey.items.length > 0) {
                monkey.itemsInspected = monkey.itemsInspected + 1;
                const item = monkey.items.shift();
    
                if(!item) throw new Error('no item')
                //inspect
                const newWorryLevel = doOperation(item, monkey.operator);
                const boredMonkey = newWorryLevel % cycleLenght;
                if(boredMonkey % monkey.test === 0) {
                    const nextMonkey = monkeysMap.get(monkey.ifTrue)
                    nextMonkey?.items.push(boredMonkey)
                } else {
                    const nextMonkey = monkeysMap.get(monkey.ifFalse)
                    nextMonkey?.items.push(boredMonkey)
                }
                
            }
        })
}

const inspectedList: number[] = []
monkeysMap.forEach((monkey) => {
    inspectedList.push(monkey.itemsInspected)
})
inspectedList.sort((a, b) => b - a);

console.log(inspectedList[0] * inspectedList[1])

