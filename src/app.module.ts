import { CitasModule } from './modules/citas/citas.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config as dotenvConfig } from 'dotenv';

// Configura dotenv utilizando el método config

dotenvConfig({ path: 'src/.env' });

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_URL!),
    CitasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
