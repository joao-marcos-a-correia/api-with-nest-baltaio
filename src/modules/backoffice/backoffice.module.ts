import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AddressService } from './services/address.service';
import { AccountService } from './services/account.service';
import { PetService } from './services/pet.service';
import { CustomerService } from './services/customer.service';
import { AuthService } from '../../shared/interfaces/services/auth.service';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';

import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';

import { AddressController } from './controllers/address.controller';
import { AccountController } from './controllers/account.controller';
import { CustomerController } from './controllers/customer.controller';
import { PetController } from './controllers/pet.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '3600' },
    }),
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [
    AccountController,
    AddressController,
    CustomerController,
    PetController,
  ],
  providers: [
    AccountService,
    AuthService,
    AddressService,
    CustomerService,
    PetService,
    JwtStrategy,
  ],
})
export class BackofficeModule {}
