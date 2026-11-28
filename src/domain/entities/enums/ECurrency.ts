export enum ECurrency {
  EUR = "EUR",
  USD = "USD",
}

export function readCurrency(value: string | null | undefined): ECurrency | undefined {
  return Object.values(ECurrency).find((currency) => currency === value);
}
