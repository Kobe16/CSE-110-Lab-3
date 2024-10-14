export enum Label {
    personal = "personal",
    study = "study",
    work = "work",
    other = "other",
}

export type GroceryItem = { name: string; isPurchased: boolean };

export type Note = {
    id: number;
    title: string;
    content: string;
}