/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Country, CountryResponse } from '../interfaces/country.interface';
import { CustomHttpService } from 'src/shared/http/http.service';
import { ApiUrlBuilder } from 'src/shared/utils/api-url-build';
import { AxiosError } from 'axios';

@Injectable()
export class CountriesService {
  constructor(private readonly customHttpService: CustomHttpService) {}

  async getCountriesWithBasicInfo(): Promise<CountryResponse> {
    const url = ApiUrlBuilder.getAllCountries();
    return {
      message: 'Countries found successfully',
      success: true,
      data: await this.fetchData(url),
    };
  }

  async getSearchCountriesByName(name: string): Promise<CountryResponse> {
    try {
      const url = ApiUrlBuilder.getCountriesByName(name);
      const response = await this.customHttpService.get<Country[]>(url);

      if (!response.data || response.data.length === 0) {
        throw new NotFoundException(`Country not found with name: ${name}`);
      }
      return {
        message: 'Country found successfully',
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (this.isNotFoundError(error)) {
        throw new NotFoundException(`Country not found with name: ${name}`);
      }

      if (error instanceof AxiosError) {
        throw new Error(`Failed to fetch countries API: ${error.message}`);
      }

      throw error;
    }
  }

  async getTopTenPopulousCountries(): Promise<CountryResponse> {
    try {
      const url = ApiUrlBuilder.getAllCountries();
      const response = await this.fetchData(url);
      const filteredCountries = response
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
        .map((country) => this.formatCountry(country));
      return {
        message: 'Countries found successfully',
        success: true,
        data: filteredCountries,
      };
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

  private isNotFoundError(error: any): boolean {
    if (error instanceof AxiosError) {
      return error.response?.status === 404;
    }

    if (error instanceof NotFoundException) {
      return true;
    }

    if (
      error.message?.includes('not found') ||
      error.message?.includes('Not Found') ||
      error.message?.includes('404')
    ) {
      return true;
    }

    return false;
  }
}
