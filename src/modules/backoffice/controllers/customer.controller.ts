import { CreditCard } from './../models/credit-card.model';
import { CreateCreditCardContract } from './../contracts/customer/create-credit-card.contract';
import { UpdateCustomerDto } from './../dtos/customer/update.customer.dto';
import { UpdateCustomerContract } from './../contracts/customer/update-customer.contract';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { QueryValidatorContract } from '../contracts/query/query.validator.contract';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { Result } from './../models/result.model';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { CreateCustomerDto } from '../dtos/customer/create.customer.dto';
import { QueryDto } from '../dtos/query.dto';
import { ValidatorInterceptor } from './../../../interceptors/validator.interceptor';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  async getAll() {
    try {
      const customers = await this.customerService.findAll();
      return new Result(
        'Clientes recuperados com sucesso',
        true,
        customers,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new Result(
          'Nao foi possivel recuperar os clientes',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':document')
  async getById(@Param('document') document: string) {
    try {
      const customer = await this.customerService.find(document);
      return new Result('Cliente recuperado com sucesso', true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result('Nao foi possivel recuperar o cliente', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() body: CreateCustomerDto) {
    try {
      const user = await this.accountService.create(
        new User(body.name, body.password, true),
      );

      const customer = new Customer(
        body.name,
        body.document,
        body.email,
        [],
        null,
        null,
        null,
        user,
      );
      const res = await this.customerService.create(customer);

      return new Result('Cliente criado com sucesso', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Nao foi possivel realizar seu cadastro',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('query')
  @UseInterceptors(new ValidatorInterceptor(new QueryValidatorContract()))
  async query(@Body() model: QueryDto) {
    try {
      const customers = await this.customerService.query(model);
      return new Result('Sucesso', true, customers, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Nao foi possivel recuperar os clientes',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/credit-cards')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
  async createCreditCard(@Param('document') document, @Body() model: CreditCard) {
    try {
      const customer = await this.customerService.saveOrUpdateCreditCard(
        document,
        model,
      );
      return new Result(
        'Forma de pagamento cadastrada com sucesso',
        true,
        customer,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new Result(
          'Nao foi possivel cadastrar a forma de pagamento',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async put(@Param('document') document, @Body() model: UpdateCustomerDto) {
    try {
      const customer = await this.customerService.update(document, model);
      return new Result('Cliente alterado com sucesso', true, customer, null);
    } catch (error) {
      throw new HttpException(
        new Result('Nao foi possivel atualizar o cliente', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':document')
  delete(@Param('document') document) {
    return new Result('Cliente removido com sucesso', true, document, null);
  }
}
