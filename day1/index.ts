import * as fs from "fs/promises";

class Elf {
    accessor snacks: number[];
    accessor calories: number;

    constructor(snacks: number[], calories: number) {
        this.snacks = snacks;
        this.calories = calories;
    }

    public static parseElfInput(input: string): Elf[] {
        const lines = input.split("\r\n");
        const elfes: Elf[] = [];
        let currentElf = new Elf([], 0);
        for (let index = 0; index < lines.length; index++) {
            if (index + 1 == lines.length) {
                currentElf.calories += parseInt(lines[index]);
                currentElf.snacks.push(parseInt(lines[index]));
                elfes.push(currentElf);
                continue;
            }

            if (lines[index].length == 0 && lines[index + 1].length == 0) {
                elfes.push(new Elf([], 0));
                currentElf = new Elf([], 0);
                continue;
            }

            if (lines[index].length == 0) {
                elfes.push(currentElf);
                currentElf = new Elf([], 0);
                continue;
            }
            currentElf.calories += parseInt(lines[index]);
            currentElf.snacks.push(parseInt(lines[index]));
        }


        return elfes;

    }
}

(async () => {
    console.time("time");
    const input = (await fs.readFile("input.txt")).toString();
    const elfes = Elf.parseElfInput(input);
    const caloriesArray: number[] = [];

    for (const { snacks, calories } of elfes) {
        caloriesArray.push(calories);
    }
    //Part 1
    console.log(Math.max(...caloriesArray));
    
    //Part 2
    console.log(caloriesArray.sort((a, b) => a - b).slice(caloriesArray.length - 3).reduce((a, b) => a + b));
    console.timeEnd("time");

})();


