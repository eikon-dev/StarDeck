import type {Kind} from "./task.ts";

export type Star = {
    id: string;
    date: number;
    type: Kind;
    value: number,
};