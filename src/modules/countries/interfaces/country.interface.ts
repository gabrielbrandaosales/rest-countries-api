export interface Country {
  name: {
    common: string;
    official: string;
  };
  population: any;
  region: string;
  capital: string[];
  subregion: string;
  // ... outros campos
}
