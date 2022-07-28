import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { CreateAddressContract } from '../contracts/address/create-address.contract';
import { Address } from './../models/address.model';
import { Result } from './../models/result.model';
import { ValidatorInterceptor } from './../../../interceptors/validator.interceptor';
import { AddressService } from '../services/address.service';
import { AddressType } from '../enums/address.type.enum';

@Controller('v1/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':document/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(@Param('document') document, @Body() model: Address) {
    try {
      await this.addressService.create(document, model, AddressType.Billing);
      return new Result('Endereço criado com sucesso', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Nao foi possivel adicionar seu endereço',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(
    @Param('document') document,
    @Body() model: Address,
  ) {
    try {
      await this.addressService.create(document, model, AddressType.Shipping);
      return new Result('Endereço criado com sucesso', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Nao foi possivel adicionar seu endereço',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
