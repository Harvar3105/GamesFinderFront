export class Config {
  public readonly identityUri: string;
  public readonly userRegisterEndpoint: string;
  public readonly userLoginEndpoint: string;
  public readonly tokenRefreshEndpoint: string;
  public readonly tokenValidateEndpoint: string;

  public readonly backendUrl: string;
  public readonly checkGameEndpoint: string;
  public readonly checkSteamOfferEndpoint: string;
  public readonly checkInstantGamingOfferEndpoint: string;
  public readonly getGammeIdEndpoint: string;
  public readonly getInstantGamingOfferIdEndpoint: string;
  public readonly getSteamOfferIdEndpoint: string;

  public readonly getGamesPaged: string;
  public readonly getGamesWithCurrencyPaged: string;

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
  }
}

export const config = new Config();
