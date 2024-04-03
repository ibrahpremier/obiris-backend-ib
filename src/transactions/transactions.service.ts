import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/baseService';

@Injectable()
export class TransactionsService {
  constructor(@InjectRepository(Transaction) readonly transactionRepository: Repository<Transaction>) {}

  private readonly baseService = BaseService<Transaction, CreateTransactionDto, UpdateTransactionDto>(this.transactionRepository);
  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return await this.baseService.create(createTransactionDto);
  }

  async findAll(): Promise<Transaction[]> {
    return await this.baseService.findAll();
  }

  async findOne(id: number): Promise<Transaction> {
    return await this.baseService.findOne({ where: { id } });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    return await this.baseService.update({ where: { id } }, updateTransactionDto);
  }

  async remove(id: number): Promise<void> {
    return await this.baseService.remove({ where: { id } });
  }
}