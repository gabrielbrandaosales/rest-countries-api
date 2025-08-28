import { Controller, Get } from '@nestjs/common';
import { CountriesService } from '../services/countries.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('TopTen')
  @ApiOperation({ summary: 'Get Top 10 Countries' })
  @ApiResponse({ status: 200, description: 'Top 10 Countries' })
  async getTopTenPopulousCountries() {
    return this.countriesService.getTopTenPopulousCountries();
  }

  @Get('All')
  @ApiOperation({ summary: 'Get all countries with basic info' })
  async getAllCountries() {
    return this.countriesService.getCountriesWithBasicInfo();
  }
}
