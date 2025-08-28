import { REST_COUNTRIES_API } from '../constants/api.constants';

export class ApiUrlBuilder {
  static buildUrl(
    endpoint: string,
    fields?: string,
    params?: Record<string, string | number>,
  ): string {
    let url = `${REST_COUNTRIES_API.BASE_URL}${endpoint}`;
    const queryParams = new URLSearchParams();

    if (fields) {
      queryParams.append('fields', fields);
    }

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        queryParams.set(key, value.toString());
      });
    }

    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    return url;
  }

  static getAllCountries(fields?: string): string {
    return this.buildUrl(
      REST_COUNTRIES_API.ENDPOINTS.ALL,
      fields || REST_COUNTRIES_API.DEFAULT_FIELDS,
    );
  }
}
