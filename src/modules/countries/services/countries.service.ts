import { Injectable } from '@nestjs/common';
import { Country } from '../interfaces/country.interface';

@Injectable()
export class CountriesService {
  async getTopTenCountries(): Promise<Country[]> {
    try {
      const response = await fetch(`${process.env.API_URL}/countries/top10`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch countries: ${error}`);
    }
  }
}
