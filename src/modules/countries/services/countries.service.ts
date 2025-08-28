import { Injectable } from '@nestjs/common';
import { Country } from '../interfaces/country.interface';
import { CustomHttpService } from 'src/shared/http/http.service';
// import { REST_COUNTRIES_API } from 'src/shared/constants/api.constants';
import { ApiUrlBuilder } from 'src/shared/utils/api-url-build';

@Injectable()
export class CountriesService {
  constructor(private readonly customHttpService: CustomHttpService) {}

  async getCountriesWithBasicInfo() {
    const url = ApiUrlBuilder.getAllCountries();
    return this.fetchData(url);
  }

  private async fetchData(url: string) {
    try {
      const response = await this.customHttpService.get<Country[]>(url);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch data from ${url}: ${error?.message || error}`,
      );
    }
  }

  async getTopTenPopulousCountries(): Promise<Country[]> {
    try {
      const url = ApiUrlBuilder.getAllCountries();
      const response = await this.fetchData(url);
      return response
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
        .map((country) => this.formatCountry(country));
    } catch (error) {
      throw new Error(`Failed to fetch countries: ${error}`);
    }
  }

  private formatCountry(apiCountry): Country {
    return {
      name: apiCountry.name.official,
      capital: apiCountry.capital,
      population: apiCountry.population,
      region: apiCountry.region,
      subregion: apiCountry.subregion,
    };
  }
}
