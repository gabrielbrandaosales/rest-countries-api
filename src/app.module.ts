import { Module } from '@nestjs/common';
import { CountriesModule } from './modules/countries/countries.module';
import { CustomHttpModule } from './shared/http/http.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CustomHttpModule,
    CountriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
