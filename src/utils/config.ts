export class Config {
  public readonly backendUrl: string;
  public readonly checkGameEndpoint: string;
  public readonly checkSteamOfferEndpoint: string;
  public readonly checkInstantGamingOfferEndpoint: string;
  public readonly getGammeIdEndpoint: string;
  public readonly getInstantGamingOfferIdEndpoint: string;
  public readonly getSteamOfferIdEndpoint: string;

  constructor() {
    this.backendUrl = process.env.NEXT_BACKEND_URL!;
    this.checkGameEndpoint = process.env.NEXT_BACKEND_CHECK_GAME!;
    this.checkSteamOfferEndpoint = process.env.NEXT_BACKEND_CHECK_STEAM_OFFER!;
    this.checkInstantGamingOfferEndpoint = process.env.NEXT_BACKEND_CHECK_IG_OFFER!;
    this.getGammeIdEndpoint = process.env.NEXT_BACKEND_GET_GAME_ID!;
    this.getInstantGamingOfferIdEndpoint = process.env.NEXT_BACKEND_GET_IG_OFFER_ID!;
    this.getSteamOfferIdEndpoint = process.env.NEXT_BACKEND_GET_STEAM_OFFER_ID!;
  }
}

export const config = new Config();
