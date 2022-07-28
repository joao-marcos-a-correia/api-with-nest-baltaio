import { Injectable } from '@nestjs/common';
import { Flunt } from "../../../../utils/flunt";
import { QueryDto } from '../../dtos/query.dto';
import { Contract } from '../contract';

@Injectable()
export class QueryValidatorContract implements Contract {
  errors: any[];

  validate(model: QueryDto): boolean {
    const flunt = new Flunt();

    if (!model.query) model.query = {};

    flunt.isGreaterThan(
      model.take,
      1000,
      'Sua paginaçao nao pode retornar mais de 1000 registros',
    );

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
