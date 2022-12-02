import * as fs from "fs/promises";

type enemyMove = "A" | "B" | "C";
type playerMove = "X" | "Y" | "Z";

const pointsForMove = new Map<string, number>([["X", 1], ["Y", 2], ["Z", 3]]);

const beatingMoves = new Map<playerMove, enemyMove>([["X", "C"], ["Y", "A"], ["Z", "B"]]);

const correspondingMoves = new Map<playerMove, enemyMove>([["X", "A"], ["Y", "B"], ["Z", "C"]]);


(async () => {

    const input = (await fs.readFile("input.txt")).toString().split("\r\n");
    let points = 0;
    input.map((game) => game.split(" ") as [enemyMove, playerMove]).forEach((moves) => {
        //Win
        if (beatingMoves.get(moves[1]) == moves[0]) {
            return points += 6 + pointsForMove.get(moves[1]);
        }
        //Draw
        if(correspondingMoves.get(moves[1]) == moves[0]){
            return points += 3 + pointsForMove.get(moves[1]);
        }
        points += pointsForMove.get(moves[1]);
    });
    console.log(points);
    
})();