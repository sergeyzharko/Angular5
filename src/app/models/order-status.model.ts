export enum Status { A = 'New', B = 'Processing', C = 'Ready', D = 'Done' }

export class OrderStatus {
    constructor(
        public id: number,
        public date: string,
        public status: Status
    ) {}
}
