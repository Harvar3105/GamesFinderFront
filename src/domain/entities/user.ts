import Entity from "./entity";

export type UserDTO = Omit<User, "identity">;

export class User extends Entity {
  public username: string;
  public roles: string[];
  public usersWishlist: number[];
  public avatarName?: string;
  public avatarContent?: string;
  public avatarContentType?: string;

  public identity?: UserIdentity;

  constructor(
    id: string,
    username: string,
    createdAt: Date,
    updatedAt: Date,
    usersWishlist: number[] = [],
    roles: string[] = [],
    identity: UserIdentity,
    avatarName?: string,
    avatarContent?: string,
    avatarContentType?: string,
  ) {
    super(id, createdAt, updatedAt);
    this.username = username;
    this.usersWishlist = usersWishlist;
    this.avatarName = avatarName;
    this.avatarContent = avatarContent;
    this.avatarContentType = avatarContentType;
    this.roles = roles;
    this.identity = identity;
  }

  public toString(): string {
    return `${this.username}: ${this.roles.join(", ")}\n\tID: ${this.id}\n\twishlisted: ${this.usersWishlist.length}`;
  }

  public getDTO(): UserDTO {
    const dto = { ...this };
    delete dto.identity;
    return dto as UserDTO;
  }
}

export class UserIdentity {
  public passwordHash?: string;
  public email: string;
  public jwt?: string;
  public rt?: string;

  constructor(email: string, passwordHash?: string, jwt?: string, rt?: string) {
    this.email = email;
    this.passwordHash = passwordHash;
    this.jwt = jwt;
    this.rt = rt;
  }
}
