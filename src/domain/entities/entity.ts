export default class Entity {
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toString(): string {
    return `id: ${this.id}, createdAt: ${this.createdAt}, updatedAt: ${this.updatedAt}`;
  }
}
