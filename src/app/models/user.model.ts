export class User {
    constructor(
        public id: number,
        public login: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public address: string,
        public isAdmin: boolean
    ) {}
}
