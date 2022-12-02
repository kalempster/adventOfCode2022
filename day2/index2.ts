import * as fs from "fs/promises";

type enemyMove = "A" | "B" | "C";
type playerMove = "X" | "Y" | "Z";

const pointsForMove = new Map<playerMove, number>([["X", 1], ["Y", 2], ["Z", 3]]);

const beatingMoves = new Map<playerMove, enemyMove>([["X", "C"], ["Y", "A"], ["Z", "B"]]);

const enemyBeatingMoves = new Map<enemyMove, playerMove>([["A", "Z"], ["B", "X"], ["C", "Y"]]);

const correspondingMoves = new Map<playerMove, enemyMove>([["X", "A"], ["Y", "B"], ["Z", "C"]]);


(async () => {

    const input = (await fs.readFile("input.txt")).toString().split("\r\n");
    let points = 0;
    input.map((game) => game.split(" ") as [enemyMove, playerMove]).forEach((moves) => {

        switch (moves[1]) {
            case "X":
                moves[1] = enemyBeatingMoves.get(moves[0]);
                break;
            case "Y":
                moves[1] = reverseMap(correspondingMoves).get(moves[0]);
                break;
            case "Z":
                moves[1] = reverseMap(beatingMoves).get(moves[0]);
            default:
                break;
        }
        return points += calcPoints(moves);
    });
    console.log(points);

})();

function calcPoints(moves: [enemyMove, playerMove]) {

    if (beatingMoves.get(moves[1]) == moves[0]) {
        return 6 + pointsForMove.get(moves[1]);
    }
    //Draw
    if (correspondingMoves.get(moves[1]) == moves[0]) {
        return 3 + pointsForMove.get(moves[1]);
    }
    return pointsForMove.get(moves[1]);

}

function reverseMap<K, V>(map: Map<K, V>) {
    const newMap = new Map<V, K>();
    for (const entry of map)
        newMap.set(entry[1], entry[0]);
    return newMap;
}