export function toQueryString(obj: object, prefix = ""): URLSearchParams {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;

    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && !Array.isArray(value)) {
      toQueryString(value, fullKey).forEach((v, k) => params.append(k, v));
    } else {
      // FIXME: [Stage1] Arrays are joined as "a,b"; ASP.NET binds collections only from repeated keys
      // (tags=a&tags=b).
      params.append(fullKey, String(value));
    }
  });

  return params;
}
