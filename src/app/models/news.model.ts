export class News {
  constructor(
    public id: number = null,
    public text: string = '',
    public createDate?: Date
  ) {
    this.createDate = new Date();
  }
}
