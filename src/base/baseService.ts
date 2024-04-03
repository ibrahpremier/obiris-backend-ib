import { FindOneOptions, Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';

export function BaseService<Entity, CreateDto, UpdateDto>(entityRepository: Repository<Entity>) {
  return {
    async create(data: CreateDto): Promise<Entity> {
      const entity = entityRepository.create(data as DeepPartial<Entity>);
      return await entityRepository.save(entity);
    },

    async findAll(): Promise<Entity[]> {
      return await entityRepository.find();
    },

    async findOne(id: FindOneOptions): Promise<Entity | undefined> {
      return await entityRepository.findOne(id);
    },

    async findOneBy(entity: any): Promise<any> {
      return await entityRepository.findOne(entity);
    },

    async update(id: FindOneOptions <Entity>, data: UpdateDto): Promise<Entity> {
      const entity = await entityRepository.findOne(id);
      if (!entity) {
        throw new Error(`Entity with ID ${id} not found`);
      }
      entityRepository.merge(entity, data as DeepPartial<Entity>);
      return await entityRepository.save(entity);
    },

    async remove(id: FindOneOptions): Promise<void> {
      const entity = await entityRepository.findOne(id);
      if (!entity) {
        throw new Error(`Entity with ID ${id} not found`);
      }
      await entityRepository.remove(entity);
    }
  };
}
