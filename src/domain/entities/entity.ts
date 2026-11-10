// TODO: Looks like no reason to make Entity as class. Refer as Data Model instead. Declare as interface.
export default class Entity {
  public id: string;
  public createdAt: Date;
  public updatedAt?: Date;

  constructor(id: string, createdAt: Date, updatedAt?: Date) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toString(): string {
    return `id: ${this.id}, createdAt: ${this.createdAt}, updatedAt: ${this.updatedAt ?? "N/A"}`;
  }
}
