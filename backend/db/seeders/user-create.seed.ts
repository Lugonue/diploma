import { User } from 'src/modules/user/entities/user.entity';
import { getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class UserCreateSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await getManager().query('TRUNCATE users');
    await factory(User)().create({
      lastName: 'Admin',
      firstName: 'Admin',
      middleName: 'Admin',
      email: 'reachme@amitavroy.com',
      password: '123123',
      role: 'admin',
    });
    // await factory(User)().createMany(20);
  }
}
