export interface BFFFetchPayload<TBody = object> {
  uri: string;
  method: string;
  headers?: HeadersInit;
  body?: TBody;
}

export class FetchError {
  message: string;
  status: number;

  constructor(msg: string, stat: number) {
    this.message = msg;
    this.status = stat;
  }
}

export default async function BFFFetch<TResponse = object, TBody = object>({
  uri,
  method,
  headers,
  body,
}: BFFFetchPayload<TBody>): Promise<TResponse> {
  const response = await fetch(uri, {
    method: method,
    headers: headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let message;
    if (response.status >= 500 && response.status < 600) {
      message = "Server is currently unavailable, please try again later.";
    } else {
      message = await response.text();
    }
    throw new FetchError(message, response.status);
  }

  return (await response.json()) as TResponse;
}
