import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePetContract } from '../contracts/pet/create-pet.contract';
import { Result } from './../models/result.model';
import { Pet } from '../models/pet.model';
import { ValidatorInterceptor } from './../../../interceptors/validator.interceptor';
import { PetService } from '../services/pet.service';

@Controller('v1/pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post(':document')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async add(@Param('document') document, @Body() model: Pet) {
    try {
      await this.petService.create(document, model);
      return new Result('Pet criado com sucesso', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Nao foi possivel criar seu Pet', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(
    @Param('document') document,
    @Param('id') id,
    @Body() model: Pet,
  ) {
    try {
      await this.petService.update(document, id, model);
      return new Result('Pet alterado com sucesso', true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Nao foi possivel alterar seu Pet', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
