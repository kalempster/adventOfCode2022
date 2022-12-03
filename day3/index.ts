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
    const teams: string[][] = [];

    for (let index = 0; index < input.length; index++) {
        if (index % 3 != 0) {
            teams[Math.floor(index / 3)].push(input[index]);
            continue;
        }
        teams.push([input[index]]);
    }

    console.log(
        teams
            .map((team) => {
                //Intersection to find badge
                const [badge] = [team[0].split(""), team[1].split(""), team[2].split("")].reduce(
                    (a, b) => a.filter((c) => b.includes(c))
                );
                return prioForChars.find((o) => o.character == badge).priority;
            })
            .reduce((a, b) => a + b)
    );
})();
