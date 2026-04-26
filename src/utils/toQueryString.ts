export function toQueryString(obj: object, prefix = ""): URLSearchParams {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;


    if (typeof value === "object" && !Array.isArray(value)) {
      toQueryString(value, key).forEach((v, k) => params.append(k, v));
    } else {
      params.append(key, String(value));
    }
  });

  return params;
}
