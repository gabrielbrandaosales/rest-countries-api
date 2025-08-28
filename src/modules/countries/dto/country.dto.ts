import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDTO {
  @ApiProperty({ example: 'Brazil', description: 'Common name of the country' })
  name: string;

  @ApiProperty({
    example: 'Brasília',
    description: 'Capital city of the country',
  })
  capital: string;

  @ApiProperty({
    example: 'Americas',
    description: 'Region where the country is located',
  })
  region: string;

  @ApiProperty({
    example: 'South America',
    description: 'Subregion where the country is located',
  })
  subregion: string;

  @ApiProperty({
    example: 212559409,
    description: 'Population of the country',
    type: Number,
  })
  population: number;

  @ApiProperty({
    example: 'https://flagcdn.com/br.svg',
    description: 'URL of the country flag',
    required: false,
  })
  flag?: string;
}
