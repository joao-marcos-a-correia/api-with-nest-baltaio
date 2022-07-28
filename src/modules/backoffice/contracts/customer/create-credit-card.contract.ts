import { Injectable } from '@nestjs/common';
import { Flunt } from '../../../../utils/flunt';
import { Contract } from '../contract';
import { CreditCard } from './../../models/credit-card.model';

@Injectable()
export class CreateCreditCardContract implements Contract {
  errors: any[];

  validate(model: CreditCard): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.holder, 5, 'Nome no cartao invalido');
    flunt.isFixedLen(model.number, 16, 'Numero do cartao invalido');
    flunt.isFixedLen(
      model.expiration,
      4,
      'Data de expiraçao do cartao invalido',
    );

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
