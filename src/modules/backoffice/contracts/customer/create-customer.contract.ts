import { Injectable } from '@nestjs/common';
import { Flunt } from '../../../../utils/flunt';
import { CreateCustomerDto } from '../../dtos/customer/create.customer.dto';
import { Contract } from '../contract';

@Injectable()
export class CreateCustomerContract implements Contract {
  errors: any[];

  validate(model: CreateCustomerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome Invalido');
    flunt.isEmail(model.email, 'Email Invalido');
    flunt.isFixedLen(model.document, 11, 'CPF Invalido');
    flunt.hasMinLen(model.password, 6, 'Senha Invalida');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
