import {databaseRef} from "../firebase";

const statements = [
    ["Assertive, Dominant", 4],
    ["Calm", 6],
    ["Competitive", 8],
    ["Confident", 9],
    ["Considerate", 10],
    ["Disorderly", 15],
    ["Dissatisfied", 16],
    ["Dull", 18],
    ["Easily Hurt", 20],
    ["Energetic", 21],
    ["Fair-Minded, Objective", 22],
    ["Friendly", 25],
    ["Guileful", 26],
    ["Helpless", 27],
    ["Idealistic", 29],
    ["Impulsive", 31],
    ["Intelligent", 32],
    ["Jealous", 35],
    ["Lazy", 36],
    ["Likable", 37],
    ["Reasonable", 40],
    ["Resentful", 42],
    ["Introspective", 43],
    ["Restless", 44],
    ["Self-Indulgent", 48],
    ["Self-Pitying", 50],
    ["Sincere", 54],
    ["Stubborn", 56],
    ["Sympathetic", 58],
    ["Touchy, Irritable", 60],
    ["Unhappy", 64],
    ["Uninterested, Indifferent", 65],
    ["Unworthy, Inadequate", 66],
    ["Warm", 67],
    ["Worried Anxious", 69],
];

export function createReducedAdjectiveSet() {
    databaseRef.collection("qSets").doc("adjective_35").set({
        distribution: [5, 5, 5, 5, 5, 5, 5],
        factors: [],
        id: "adjective_35",
        name: "35 Item Adjective Q-Set",
        sortCode: "AJQ",
        statements: Object.fromEntries(statements.map(([s, id], i) => ["AJQ " + ( id < 10 ? "0"+id : (id)), {factors: [], statement: s} ]))
    })

}
