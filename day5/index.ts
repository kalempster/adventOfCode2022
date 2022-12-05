import * as fs from "fs/promises";

(async () => {

    const stack : string[][] = [];    
    let [crates, instructions] = (await fs.readFile("input.txt")).toString().split("\r\n\r\n");
    const cratesLines = crates.split("\r\n");
    const instructionLines = instructions.split("\r\n");

    cratesLines.forEach((line) => {
        console.log(line.split(""));
        
        console.log(line.split("").filter((v, index) => {
            if((index + 1) % 4 == 0) {
                return false;
            }
            return true;
        }));
    });  


})();
