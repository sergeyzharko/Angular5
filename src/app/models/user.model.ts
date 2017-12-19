import { Phone } from './phone.model';
export enum Notification { A = 'Email', B = 'Phone' }

export class User {
    constructor(
        public id: number = null,
        public login: string = '',
        public password: string = '',
        public firstName: string = '',
        public lastName: string = '',
        public notification: Notification = Notification.A,
        public email?: string,
        public phones?: Array<Phone>,
        public address?: string,
        public isAdmin: boolean = false
    ) {}
}
