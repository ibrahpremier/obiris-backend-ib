import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/baseService';

@Injectable()
export class CouponsService {
  constructor(@InjectRepository(Coupon) readonly couponRepository: Repository<Coupon>) {}

  private readonly baseService = BaseService<Coupon,CreateCouponDto,UpdateCouponDto>(this.couponRepository);

  async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    return await this.baseService.create(createCouponDto);
  }

  async findAll():Promise<Coupon[]> {
    return await this.baseService.findAll();
  }

  async findOne(id: number):Promise<Coupon> {
    return await this.baseService.findOne({ where: { id } });
  }

  async update(id: number, updateCouponDto: UpdateCouponDto):Promise<Coupon> {
    return await this.baseService.update({ where: { id } },updateCouponDto);
  }

  async remove(id: number) {
    return await this.baseService.remove({ where: { id } });
  }
}
