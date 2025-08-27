import { Controller, Get } from '@nestjs/common';
import { CountriesService } from '../services/countries.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('top10')
  @ApiOperation({ summary: 'Get Top 10 Countries' })
  @ApiResponse({ status: 200, description: 'Top 10 Countries' })
  index() {
    return this.countriesService.getTopTenCountries();
  }
}
