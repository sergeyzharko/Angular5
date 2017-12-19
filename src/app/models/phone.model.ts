export enum Type { A = 'Home', B = 'Work', C = 'Mobile', D = 'Other' }

export class Phone {
    constructor(
        public number: number,
        public type: Type
    ) {}
}
