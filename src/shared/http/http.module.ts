import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CustomHttpService } from './http.service';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    CustomHttpService,
    {
      provide: 'HTTP_TIMEOUT',
      useValue: 10000,
    },
  ],
  exports: [CustomHttpService, HttpModule],
})
export class CustomHttpModule {}
