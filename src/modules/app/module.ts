import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { ProductController } from './controllers/product';
import { ProfileController } from './controllers/profile';
import { SaleController } from './controllers/sale';
import { DeviceRepository } from './repositories/device';
import { ProductRepository } from './repositories/product';
import { SaleRepository } from './repositories/sale';
import { SaleProductRepository } from './repositories/saleProduct';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { SaleService } from './services/sale';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, ProfileController, ProductController, SaleController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    DeviceRepository,
    ProductRepository,
    SaleRepository,
    SaleProductRepository,
    SaleService
  ]
})
export class AppModule {}
