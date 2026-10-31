import "server-only";

export class Config {
  // FIXME: [Stage5] Add the Identity profilePicture endpoint.
  // FIXME: [Stage6] Add the Identity manage/* role endpoints.
  public readonly identityUri: string;
  public readonly userRegisterEndpoint: string;
  public readonly userLoginEndpoint: string;
  public readonly tokenRefreshEndpoint: string;
  public readonly tokenValidateEndpoint: string;

  // FIXME: [Stage1] The backend moved these routes (Steam/* -> Game/*, GameOffer/*). Remove the worker-only
  // check/getId endpoints; add Game/getPagedWithLowest, Game/GetPagedWithLowestFiltered, Game/getGame,
  // GameOffer/getGameOffers, GameOffer/vendors, UserData/* and the scraping endpoints. Update .env.* to match.
  public readonly backendUrl: string;
  public readonly checkGameEndpoint: string;
  public readonly checkSteamOfferEndpoint: string;
  public readonly checkInstantGamingOfferEndpoint: string;
  public readonly getGammeIdEndpoint: string;
  public readonly getInstantGamingOfferIdEndpoint: string;
  public readonly getSteamOfferIdEndpoint: string;

  public readonly getGamesPaged: string;
  public readonly getGamesWithCurrencyPaged: string;

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
    this.checkGameEndpoint = process.env.BACKEND_CHECK_GAME!;
    this.checkSteamOfferEndpoint = process.env.BACKEND_CHECK_STEAM_OFFER!;
    this.checkInstantGamingOfferEndpoint = process.env.BACKEND_CHECK_IG_OFFER!;
    this.getGammeIdEndpoint = process.env.BACKEND_GET_GAME_ID!;
    this.getInstantGamingOfferIdEndpoint = process.env.BACKEND_GET_IG_OFFER_ID!;
    this.getSteamOfferIdEndpoint = process.env.BACKEND_GET_STEAM_OFFER_ID!;

    this.getGamesPaged = process.env.BACKEND_GET_GAMES_PAGED!;
    this.getGamesWithCurrencyPaged = process.env.BACKEND_GET_GAMES_WITH_CURRENCY_PAGED!;

    this.redisHost = process.env.REDIS_HOST!;
    this.redisPort = Number.parseInt(process.env.REDIS_PORT!);
    this.redisPassword = process.env.REDIS_PASSWORD!;
    this.redisDB = Number.parseInt(process.env.REDIS_DATABASE!);
  }
}

export const config = new Config();
