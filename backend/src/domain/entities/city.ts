import { Place } from "@prisma/client";
import { Events } from "./event";

export class City {
    constructor(
        public name: string,
        public location: string,
        public description: string,
        public photoURL: string,
        public places?: Place[],
        public events?: Events[],
        public instagram?: string | null,
        public readonly id?: string
    ){}
}