import * as fs from "fs/promises";

(async () => {
    const input = (await fs.readFile("input.txt")).toString().split("\r\n");

    console.log(
        input
            .map((pair) => {
                const [firstElf, secondElf] = pair.split(",");
                const firstElfRange = range(
                    parseInt(firstElf.split("-")[0]),
                    parseInt(firstElf.split("-")[1])
                );

                const secondElfRange = range(
                    parseInt(secondElf.split("-")[0]),
                    parseInt(secondElf.split("-")[1])
                );
                const intersects = firstElfRange
                    .map((value) => secondElfRange.includes(value))
                    .filter((v) => v)[0];
                return Number(intersects ? intersects : 0);
            })
            .reduce((a, b) => a + b)
    );
})();

function range(start: number, end: number) {
    return Array.from({ length: end + 1 - start }, (v, k) => k + start);
}
