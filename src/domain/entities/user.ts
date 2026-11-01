import Entity from "./entity";

export type UserDTO = Omit<User, "identity">;

export class User extends Entity {
  public username: string;
  public lastLogin: Date | null;
  public email: string;
  public roles: string[];
  public data?: UserData;

  constructor(
    id: string,
    createdAt: Date,
    username: string,
    email: string,
    lastLogin: Date | null,
    roles?: string[],
    data?: UserData,
  ) {
    super(id, createdAt);
    this.username = username;
    this.email = email;
    this.roles = roles ?? [];
    this.lastLogin = lastLogin;
    this.data = data;
  }

  public toString(): string {
    return `${this.username}: ${this.roles.join(", ")}\n\tID: ${this.id}\n\tdata: ${this.data}`;
  }
}

// FIXME: [Stage5] Replace with the backend UserData: steamId64, wishlistSyncedAt, wishlistSyncStatus,
// steamWishlist ({ steamAppId, priority, addedAt }[]), hiddenSteamIds, preferredCurrency ("EUR" | "USD"),
// region (ISO 3166-1 alpha-2). The profile picture moved to Identity.
export class UserData extends Entity {
  public usersWishlist: number[];
  public pfpName?: string;
  public pfpContent?: string;
  public pfpExtension?: string;

  constructor(
    userId: string,
    usersWishlist: number[],
    pfpName?: string,
    pfpContent?: string,
    pfpExt?: string,
    createdAt: Date = new Date(),
  ) {
    super(userId, createdAt);
    this.usersWishlist = usersWishlist;
    this.pfpName = pfpName;
    this.pfpContent = pfpContent;
    this.pfpExtension = pfpExt;
  }

  public toString(): string {
    return `${this.usersWishlist.join(" ")}`;
  }
}
