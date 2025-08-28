import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from '../services/countries.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('topTenPopulousCountries')
  @ApiOperation({ summary: 'Get top 10 countries with populous population' })
  @ApiResponse({ status: 200, description: 'Top 10 Countries' })
  async getTopTenPopulousCountries() {
    return this.countriesService.getTopTenPopulousCountries();
  }

  @Get('allCountries')
  @ApiOperation({ summary: 'Get all countries with basic info' })
  @ApiResponse({ status: 200, description: 'All countries with basic info' })
  async getAllCountries() {
    return this.countriesService.getCountriesWithBasicInfo();
  }

  @Get('searchCountry')
  @ApiOperation({ summary: 'Get a country by name' })
  @ApiResponse({ status: 200, description: 'Country found' })
  async searchCountry(@Query('nome') name: string) {
    return this.countriesService.getSearchCountriesByName(name);
  }

  // @Post('rating')
  // @ApiOperation({ summary: 'Create a rating for a country' })
  // @ApiResponse({ status: 200, description: 'Country rating created' })
  // async createCountryRating(@Body() body) {
  //   return this.countriesService.createCountryRating(body);
  // }
}
