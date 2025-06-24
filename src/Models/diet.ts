import { Dish } from "./dish";

export interface Diet {
    id: number;
    name: string;
    observation: string;
    dishes: Dish[];
}
