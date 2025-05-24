export class Events {
    constructor(
        public name: string,
        public date: Date,
        public active: boolean = false,
        public description: string,
        public photoURL: string,
        public cityId: string,
        public instagram?: string | null,
        public readonly id?: string
    ){}
}