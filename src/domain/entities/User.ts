import Entity from "./entity";

export class User extends Entity {
  public username: string;
  private roles: string[];
  public passwordHash?: string;
  public email: string;
  public jwt?: string;
  public rt?: string;
  public data?: UserData;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    username: string,
    email: string,
    roles: string[] = [],
    passwordHash?: string,
    jwt?: string,
    rt?: string,
    data?: UserData,
  ) {
    super(id, createdAt, updatedAt);
    this.username = username;
    this.email = email;
    this.roles = roles;
    this.passwordHash = passwordHash;
    this.jwt = jwt;
    this.rt = rt;
    this.data = data;
  }
}

export class UserData extends Entity {
  public userId: string;
  public usersWishlist: number[];
  public avatarName?: string;
  public avatarContent?: string;
  public avatarContentType?: string;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    userId: string,
    usersWishlist: number[] = [],
    avatarName?: string,
    avatarContent?: string,
    avatarContentType?: string,
  ) {
    super(id, createdAt, updatedAt);
    this.userId = userId;
    this.usersWishlist = usersWishlist;
    this.avatarName = avatarName;
    this.avatarContent = avatarContent;
    this.avatarContentType = avatarContentType;
  }
}
