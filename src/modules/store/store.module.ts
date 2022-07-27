import { OrderItemService } from './services/order-item.service';
import { OrderService } from './services/order.service';
import { ProductController } from './controllers/product.controller';
import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order, OrderItem])],
  controllers: [ProductController, OrderController],
  providers: [ProductService, OrderService, OrderItemService],
})
export class StoreModule {}
