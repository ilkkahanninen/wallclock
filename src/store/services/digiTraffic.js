import { mapObjIndexed, pipe, values, join } from 'ramda';

const querify = pipe(
  mapObjIndexed((value, key) => `${key}=${value}`),
  values,
  join('&'),
);

export default {
  async get(path, query) {
    const queryStr = query ? `?${querify(query)}` : '';
    const response = await fetch(
      'https://rata.digitraffic.fi/api/v1' + path + queryStr,
    );
    return response.json();
  },
};
