import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Coupon } from './entities/coupon.entity';
@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creation d\'un nouveau coupon' })

  async create(@Body() createCouponDto: CreateCouponDto): Promise<Coupon> {
    return await this.couponsService.create(createCouponDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liste de tous les coupons' })
  @ApiOkResponse({ description: 'Liste de tous les coupons', type: [Coupon] })

  async findAll(): Promise<Coupon[]> {
    return await this.couponsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperer un coupon par son ID' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Coupon details', type: Coupon })
  @ApiNotFoundResponse({ description: 'Coupon non trouvé !' })

  async findOne(@Param('id') id: string): Promise<Coupon> {
    return await this.couponsService.findOne(+id);
  }
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Modification d\'un coupon par son ID' })
  @ApiOkResponse({ description: 'Le coupon a été modifié avec succès', type: Coupon })
  @ApiNotFoundResponse({ description: 'Coupon non trouvé' })
  @ApiBadRequestResponse({ description: 'Bad request' })

  async update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    return await this.couponsService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Suppression d\'un coupon par son ID' })
  @ApiOkResponse({ description: 'Le coupon a été supprimé avec succès', type: Coupon })
  @ApiNotFoundResponse({ description: 'Coupon non trouvé' })

  async remove(@Param('id') id: string): Promise<void> {
    return await this.couponsService.remove(+id);
  }
}
