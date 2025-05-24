import { Category } from "@prisma/client"

export class Place {
    constructor(
        public name: string,
        public location: string,
        public description: string,
        public photoURL: string,
        public category: Category,
        public cityId: string,
        public phone?: string,
        public instagram?: string,
        public readonly id?: string
    ){}
}