import { Category } from '@/modules/product/entities/category.entity';
import { getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CategoryCreateSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const categoryRepository = getRepository(Category);
    const count = await categoryRepository.count();
    if (count) {
      console.log('Category are already present, skipping seed');
      return;
    }
    await factory(Category)().create({ name: 'Стельки' });
    await factory(Category)().create({ name: 'Бандажи' });
    await factory(Category)().create({ name: 'Корректоры' });
    await factory(Category)().create({ name: 'Подушки' });
  }
}
