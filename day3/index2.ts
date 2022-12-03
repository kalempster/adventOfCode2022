import * as fs from "fs/promises";

const prioForChars: { character: string; priority: number }[] = [];

let priority = 1;
for (let index = "a"; index <= "z"; index = String.fromCharCode(index.charCodeAt(0) + 1)) {
    prioForChars.push({ character: index, priority: priority });
    priority++;
}
//Two for loops because "a" > "A"
for (let index = "A"; index <= "Z"; index = String.fromCharCode(index.charCodeAt(0) + 1)) {
    prioForChars.push({ character: index, priority: priority });
    priority++;
}

(async () => {
    const input = (await fs.readFile("input.txt")).toString().split("\r\n");

    console.log(
        input
            .map((rucksack) => {
                const firstComp = rucksack.slice(0, Math.floor(rucksack.length / 2)).split("");
                const secondComp = rucksack.slice(Math.floor(rucksack.length / 2)).split("");
                const [commonItem] = firstComp.filter((item) => secondComp.includes(item));
                return commonItem;
            })
            .map((commonItem) => {
                return prioForChars.find((o) => o.character == commonItem).priority;
            })
            .reduce((a, b) => a + b)
    );
})();
