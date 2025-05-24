import { Category } from "@prisma/client"

export class Place {
    constructor(
        public name: string,
        public location: string,
        public description: string,
        public photoURL: string,
        public category: Category,
        public cityId: string,
        public readonly id: string,
        public phone: string | null,
        public instagram: string |null,
    ){}
}