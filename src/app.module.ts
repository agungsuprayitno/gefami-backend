import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PinjamModule } from './pinjam/pinjam.module';

@Module({
  // imports: [ConfigModule.forRoot()],
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, PinjamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
