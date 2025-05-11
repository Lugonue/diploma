import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        schema: 'public',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        seeds: [__dirname + 'src/db/seeds/*.ts'],
        synchronize: config.get('DB_SYNCHRONIZE'), // false в production!
        logging: ['error', 'warn'], // Логирование запросов (опционально)
        autoLoadEntities: true,
        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      }),
      dataSourceFactory: async (options) => {
        return new DataSource(options!).initialize();
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
