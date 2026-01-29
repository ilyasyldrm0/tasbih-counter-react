export interface Recommendation {
    text: string;
    reason: string;
    target?: number;
}

export const RECOMMENDATIONS: Recommendation[] = [
    {
        text: "Subhanallah",
        reason: "Allah'ın kusursuzluğunu tesbih etmek için.",
        target: 33,
    },
    {
        text: "Elhamdulillah",
        reason: "Verilen nimetlere şükretmek için.",
        target: 33,
    },
    {
        text: "Allahu Ekber",
        reason: "Allah'ın büyüklüğünü anmak için.",
        target: 33,
    },
    {
        text: "La ilahe illallah",
        reason: "Tevhid inancını tazelemek için (En faziletli zikir).",
        target: 100,
    },
    {
        text: "Subhanallahi ve bihamdihi",
        reason: "Günahların affı için (Günde 100 kere).",
        target: 100,
    },
    {
        text: "La havle ve la kuvvete illa billah",
        reason: "Güç ve kuvvet ancak Allah'tandır.",
        target: 100,
    },
    {
        text: "Estağfirullah",
        reason: "Bağışlanma dilemek için.",
        target: 100,
    },
    {
        text: "Allahumme salli ala seyyidina Muhammed",
        reason: "Peygamber Efendimize salavat getirmek için.",
        target: 100,
    },
];
