import { ApiProperty } from '@nestjs/swagger';
import { CountryResponseDTO } from './country.dto';

export class ApiResponseDTO<T> {
  @ApiProperty({
    example: 'Operation successful',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({ example: true, description: 'Operation status' })
  success: boolean;

  @ApiProperty({ description: 'Response data', type: [Object] })
  data: T[];

  constructor(message: string, data: T[], success: boolean = true) {
    this.message = message;
    this.data = data;
    this.success = success;
  }
}

export class CountryApiResponseDTO extends ApiResponseDTO<CountryResponseDTO> {
  @ApiProperty({ type: [CountryResponseDTO] })
  declare data: CountryResponseDTO[];
}
