import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../modules/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

export class AdminSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const existingAdmin = await userRepository.findOne({ where: { email: 'admin@example.com' } });
    if (existingAdmin) {
      console.log('Admin user already exists, skipping seed.');
      return;
    }
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = userRepository.create({
      email: adminEmail,
      firstName: 'admin',
      lastName: 'admin',
      password: hashedPassword,
      role: 'admin',
      dateOfBirth: new Date('1990-01-01'),
    });

    await userRepository.save(adminUser);
    console.log('Admin user created');
  }
}
