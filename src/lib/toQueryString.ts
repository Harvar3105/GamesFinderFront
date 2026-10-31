export function toQueryString(obj: object, prefix = ""): URLSearchParams {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;

    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      value.forEach((item) => params.append(fullKey, String(item)));
    } else if (typeof value === "object") {
      toQueryString(value, fullKey).forEach((v, k) => params.append(k, v));
    } else {
      params.append(fullKey, String(value));
    }
  });

  return params;
}
