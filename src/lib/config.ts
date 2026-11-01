import "server-only";

export class Config {
  // FIXME: [Stage5] Add the Identity profilePicture endpoint.
  // FIXME: [Stage6] Add the Identity manage/* role endpoints.
  public readonly identityUri: string;
  public readonly userRegisterEndpoint: string;
  public readonly userLoginEndpoint: string;
  public readonly tokenRefreshEndpoint: string;
  public readonly tokenValidateEndpoint: string;

  public readonly backendUrl: string;
  public readonly gamesFilteredPagedEndpoint: string;
  public readonly gameEndpoint: string;
  public readonly gameOffersEndpoint: string;
  public readonly vendorsEndpoint: string;

  public readonly userDataEndpoint: string;
  public readonly userPreferencesEndpoint: string;
  public readonly userHiddenGamesEndpoint: string;
  public readonly userSteamAccountEndpoint: string;

  public readonly steamScrapeEndpoint: string;
  public readonly instantGamingScrapeIdsEndpoint: string;
  public readonly instantGamingScrapeRangeEndpoint: string;
  public readonly instantGamingScrapeUpToEndpoint: string;

  public readonly redisHost: string;
  public readonly redisPort: number;
  public readonly redisPassword: string;
  public readonly redisDB: number;

  constructor() {
    this.identityUri = process.env.IDENTITY_URI!;
    this.userRegisterEndpoint = process.env.USER_REGISTRATION!;
    this.userLoginEndpoint = process.env.USER_LOGIN!;
    this.tokenRefreshEndpoint = process.env.TOKEN_REFRESH!;
    this.tokenValidateEndpoint = process.env.TOKEN_VALIDATE!;

    this.backendUrl = process.env.BACKEND_URL!;
    this.gamesFilteredPagedEndpoint = process.env.BACKEND_GET_GAMES_FILTERED!;
    this.gameEndpoint = process.env.BACKEND_GET_GAME!;
    this.gameOffersEndpoint = process.env.BACKEND_GET_GAME_OFFERS!;
    this.vendorsEndpoint = process.env.BACKEND_GET_VENDORS!;

    this.userDataEndpoint = process.env.BACKEND_USER_DATA!;
    this.userPreferencesEndpoint = process.env.BACKEND_USER_PREFERENCES!;
    this.userHiddenGamesEndpoint = process.env.BACKEND_USER_HIDDEN_GAMES!;
    this.userSteamAccountEndpoint = process.env.BACKEND_USER_STEAM_ACCOUNT!;

    this.steamScrapeEndpoint = process.env.BACKEND_SCRAPE_STEAM!;
    this.instantGamingScrapeIdsEndpoint = process.env.BACKEND_SCRAPE_IG_IDS!;
    this.instantGamingScrapeRangeEndpoint = process.env.BACKEND_SCRAPE_IG_RANGE!;
    this.instantGamingScrapeUpToEndpoint = process.env.BACKEND_SCRAPE_IG_UP_TO!;

    this.redisHost = process.env.REDIS_HOST!;
    this.redisPort = Number.parseInt(process.env.REDIS_PORT!);
    this.redisPassword = process.env.REDIS_PASSWORD!;
    this.redisDB = Number.parseInt(process.env.REDIS_DATABASE!);
  }
}

export const config = new Config();
