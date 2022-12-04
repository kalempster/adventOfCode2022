import * as fs from "fs/promises";

(async () => {
    const input = (await fs.readFile("input.txt")).toString().split("\r\n");

    console.log(
        input
            .map((pair) => {
                const [firstElf, secondElf] = pair.split(",");
                const firstElfRange = [
                    parseInt(firstElf.split("-")[0]),
                    parseInt(firstElf.split("-")[1]),
                ];

                const secondElfRange = [
                    parseInt(secondElf.split("-")[0]),
                    parseInt(secondElf.split("-")[1]),
                ];

                return Number(
                    (firstElfRange[0] <= secondElfRange[0] &&
                        firstElfRange[1] >= secondElfRange[1]) ||
                        (secondElfRange[0] <= firstElfRange[0] &&
                            secondElfRange[1] >= firstElfRange[1])
                );
            })
            .reduce((a, b) => a + b)
    );
})();
