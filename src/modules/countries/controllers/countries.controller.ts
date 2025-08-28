import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from '../services/countries.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDTO, CountryApiResponseDTO } from '../dto/api-response.dto';
import { Country } from '../interfaces/country.interface';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('topTenPopulousCountries')
  @ApiOperation({ summary: 'Get top 10 countries with populous population' })
  @ApiResponse({
    status: 200,
    description: 'Top 10 Countries',
    type: CountryApiResponseDTO,
  })
  async getTopTenPopulousCountries() {
    const data = await this.countriesService.getTopTenPopulousCountries();

    return {
      message: 'Countries found successfully',
      success: true,
      data,
    };
  }

  @Get('allCountries')
  @ApiOperation({ summary: 'Get all countries with basic info' })
  @ApiResponse({
    status: 200,
    description: 'All countries with basic info',
    type: CountryApiResponseDTO,
  })
  async getAllCountries(): Promise<ApiResponseDTO<Country>> {
    const response = await this.countriesService.getCountriesWithBasicInfo();
    return {
      message: 'Countries found successfully',
      success: true,
      data: response,
    };
  }

  @Get('searchCountry')
  @ApiOperation({ summary: 'Get a country by name' })
  @ApiResponse({
    status: 200,
    description: 'Country found',
    type: CountryApiResponseDTO,
  })
  @ApiResponse({ status: 404, description: 'Country not found' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async searchCountry(
    @Query('nome') name: string,
  ): Promise<ApiResponseDTO<Country>> {
    const response = await this.countriesService.getSearchCountriesByName(name);
    return {
      message: 'Country found successfully',
      success: true,
      data: response,
    };
  }

  // @Post('rating')
  // @ApiOperation({ summary: 'Create a rating for a country' })
  // @ApiResponse({ status: 200, description: 'Country rating created' })
  // async createCountryRating(@Body() body) {
  //   return this.countriesService.createCountryRating(body);
  // }
}
