import { Injectable } from '@nestjs/common';
import { CreateResultatDto } from './dto/create-resultat.dto';
import { UpdateResultatDto } from './dto/update-resultat.dto';

@Injectable()
export class ResultatsService {
  create(createResultatDto: CreateResultatDto) {
    return 'This action adds a new resultat';
  }

  findAll() {
    return `This action returns all resultats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resultat`;
  }

  update(id: number, updateResultatDto: UpdateResultatDto) {
    return `This action updates a #${id} resultat`;
  }

  remove(id: number) {
    return `This action removes a #${id} resultat`;
  }
}
