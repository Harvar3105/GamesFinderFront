import type { Entity } from "./entity";
import type { ECurrency } from "./enums/ECurrency";
import type { EWishlistSyncStatus } from "./enums/EWishlistSyncStatus";

/**
 * The signed-in user as the BFF returns it: the Identity account and its roles. The profile picture is
 * stored in Identity and loaded by the user id (see Avatar).
 */
export interface User {
  id: string;
  createdAt: string;
  lastLogin: string | null;
  username: string;
  email: string;
  roles: string[];
}

export interface WishlistItem {
  steamAppId: number;
  priority: number;
  addedAt: string;
}

/** Backend data of a user; its id is the Identity user id. */
export interface UserData extends Entity {
  steamId64: number | null;
  wishlistSyncedAt: string | null;
  wishlistSyncStatus: EWishlistSyncStatus;
  steamWishlist: WishlistItem[];
  hiddenSteamIds: number[];
  preferredCurrency: ECurrency;
  /** ISO 3166-1 alpha-2 country code. */
  region: string | null;
}
