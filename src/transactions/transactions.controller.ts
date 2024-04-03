import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creation d\'une nouvelle Transaction' })

  async create(@Body() createTransactionDto: CreateTransactionDto):Promise<Transaction> {
    return await this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liste de toutes les Transactions' })
  @ApiOkResponse({ description: 'Liste de toutes les Transactions', type: [Transaction] })
  
  async findAll():Promise<Transaction[]> {
    return await this.transactionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperer une Transaction par son ID' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Transaction details', type: Transaction })
  @ApiNotFoundResponse({ description: 'Transaction non trouvé !' })
  
  async findOne(@Param('id') id: string): Promise<Transaction> {
    return await this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Modification d\'une Transaction par son ID' })
  @ApiOkResponse({ description: 'La Transaction a été modifié avec succès', type: Transaction })
  @ApiNotFoundResponse({ description: 'Transaction non trouvé' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  
  async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) :Promise<Transaction>{
    return await this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suppression d\'une Transaction par son ID' })
  @ApiOkResponse({ description: 'La Transaction a été supprimé avec succès', type: Transaction })
  @ApiNotFoundResponse({ description: 'Transaction non trouvé' })
  
  async remove(@Param('id') id: string):Promise<void> {
    return await this.transactionsService.remove(+id);
  }
}
