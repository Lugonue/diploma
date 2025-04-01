import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1743446479564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository('user');
    await userRepository.insert([
      {
        email: 'manager@example.com',
        firstName: 'Manager',
        lastName: 'User',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user" WHERE email IN (
        'admin@example.com', 
        'user@example.com',
        'manager@example.com'
      )`);
  }
}
