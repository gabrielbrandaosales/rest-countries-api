export interface Country {
  name: Name;
  capital: string[];
  region: string;
  subregion: string;
  population: number;
}

export interface Name {
  common: string;
  official: string;
  // nativeName: NativeName;
}
