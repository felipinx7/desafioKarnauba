export class Admin {
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public password: string | null,
        public readonly googleId: string | null,
    ){}
}