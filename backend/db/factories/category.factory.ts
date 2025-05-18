import { define } from 'typeorm-seeding';
import { Category } from '@/modules/product/entities/category.entity';

define(Category, () => {
  const category = new Category();
  category.name = 'Category ' + Math.floor(Math.random() * 10);
  return category;
});
