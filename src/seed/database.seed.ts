import { NestFactory } from '@nestjs/core';
import { hash } from 'bcrypt';
import { AppModule } from 'src/app.module';
import { Formule } from 'src/formules/entities/formule.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm/data-source';

async function seedDatabase() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  await seedUsers(dataSource);
  console.log('User Seeder executed successfully.');
  await seedFormules(dataSource);
  console.log('Formule Seeder executed successfully.');
  await app.close();
}
export async function seedFormules(dataSource: DataSource): Promise<void> {
const formuleRepository = dataSource.getRepository(Formule);
const formulesData = [
  {

  },
  {

  }
];
for (const formuleData of formulesData) {
  let formule = formuleRepository.create(formuleData);
  await formuleRepository.save(formule);
}
}

export async function seedUsers(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);
  const USER_LIST = [
    {
      code: 77777,
      nom: 'Findel',
      prenom: 'Fofana',
      email: 'findel@example.com',
      pays: 'CIV',
      ville: 'Abidjan',
      contact: '0101561365',
      password: await hash('admin@2024', 10), 
      roleId: 1,
      status: true,
    },
    {
      code: 44444,
      nom: 'Ibrahim',
      prenom: 'Ouedraogo',
      email: 'ibrah@example.com',
      pays: 'CIV',
      ville: 'Abidjan',
      contact: '0101561365',
      password: await hash('admin@2024', 10), 
      roleId: 1,
      status: true,
    },
  ];

  for (const userData of USER_LIST) {
    let user = userRepository.create(userData);
    await userRepository.save(user);
  }
}

seedDatabase();
