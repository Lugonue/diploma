import { getRepository } from 'typeorm';
import { User } from '../../src/modules/user/entities/user.entity';
// import { getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as bcrypt from 'bcryptjs'; 

export class UserCreateSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const userRepository = getRepository(User);

    // Check if admin user already exists
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@admin.com' },
    });

    if (existingAdmin) {
      return;
    }
    const passwd = await bcrypt.hash('123123', 10);
    await factory(User)().create({
      lastName: 'Admin',
      firstName: 'Admin',
      middleName: 'Admin',
      email: 'admin@admin.com',
      dateOfBirth: new Date(),
      password: passwd,
      role: 'admin',
    });
  }
}
