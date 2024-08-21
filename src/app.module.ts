import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { VendorsModule } from './vendor/vendor.module';

@Module({
  imports: [DatabaseModule,VendorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
