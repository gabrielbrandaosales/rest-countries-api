export const REST_COUNTRIES_API = {
  BASE_URL: 'https://restcountries.com/v3.1',
  ENDPOINTS: {
    ALL: '/all',
    NAME: '/name',
    CODE: '/alpha',
    REGION: '/region',
  },
  FIELDS: {
    BASIC: 'name,capital,region,subregion,population',
    DETAILED:
      'name,capital,region,subregion,population,flags,languages,currencies',
    MINIMAL: 'name,capital,population',
  },
  DEFAULT_FIELDS: 'name,capital,region,subregion,population',
} as const;

export const APP_API = {
  BASE_URL: process.env.API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    COUNTRIES: {
      TOP_10: '/paises/top10',
      SEARCH: '/paises/buscar',
      RATE: '/paises/avaliar',
    },
    RATINGS: '/avaliacoes',
  },
} as const;
