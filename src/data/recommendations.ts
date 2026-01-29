import i18n from '../i18n';

export interface Recommendation {
    text: string;
    reason: string;
    target?: number;
}

const TR_RECOMMENDATIONS: Recommendation[] = [
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
        reason: "Bağışlanma dilemek için. İtiraf ettikten sonra af dilemek gerekir.",
        target: 100,
    },
    {
        text: "Allahumme salli ala seyyidina Muhammed",
        reason: "Peygamber Efendimize salavat getirmek için.",
        target: 100,
    },
];

const EN_RECOMMENDATIONS: Recommendation[] = [
    {
        text: "Subhanallah",
        reason: "To glorify Allah's perfection.",
        target: 33,
    },
    {
        text: "Alhamdulillah",
        reason: "To thank Allah for His blessings.",
        target: 33,
    },
    {
        text: "Allahu Akbar",
        reason: "To proclaim Allah's greatness.",
        target: 33,
    },
    {
        text: "La ilaha illallah",
        reason: "To renew faith in Tawhid (The best Dhikr).",
        target: 100,
    },
    {
        text: "Subhanallahi wa bihamdihi",
        reason: "For forgiveness of sins (100 times daily).",
        target: 100,
    },
    {
        text: "La hawla wa la quwwata illa billah",
        reason: "There is no power nor strength except by Allah.",
        target: 100,
    },
    {
        text: "Astaghfirullah",
        reason: "To seek forgiveness. Confess before seeking it.",
        target: 100,
    },
    {
        text: "Allahumma salli ala sayyidina Muhammad",
        reason: "To send blessings upon the Prophet.",
        target: 100,
    },
];

export const getRecommendations = (): Recommendation[] => {
    return i18n.locale.startsWith('tr') ? TR_RECOMMENDATIONS : EN_RECOMMENDATIONS;
};
