import { CreditCard } from './../models/credit-card.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { QueryDto } from '../dtos/query.dto';
import { Model } from 'mongoose';
import { UpdateCustomerDto } from '../dtos/customer/update.customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const customer = new this.model(data);
    return await customer.save();
  }

  async findAll(): Promise<Customer[]> {
    return await this.model.find({}, 'name email document').sort('name').exec();
  }

  async find(document: string): Promise<Customer> {
    return await this.model
      .findOne({ document })
      .populate('user', 'username')
      .exec();
  }

  async query(model: QueryDto): Promise<Customer[]> {
    const { query, fields, sort, skip, take } = model;
    return await this.model
      .find(query, fields, { skip: skip, limit: take })
      .sort(sort)
      .exec();

    // Alternatively, you can use the following:
    // return await this.model.find(query).select(fields).sort(sort).skip(skip).limit(take).exec();
  }

  async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
    return await this.model.findOneAndUpdate({ document }, data);
  }

  async saveOrUpdateCreditCard(
    document: string,
    data: CreditCard,
  ): Promise<Customer> {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          card: data,
        },
      },
      options,
    );
  }
}
