function parseUrlParams(url) {
  const segments = url.split("/")?.filter((segment) => segment !== "");
  if (!segments) {
    return {};
  }

  const params = {};

  for (let i = 0; i < segments.length; i++) {
    params[i] = segments[i];
  }

  return params;
}

export default parseUrlParams;
