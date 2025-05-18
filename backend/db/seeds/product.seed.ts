import { CsvProduct } from '@/db/seeds/product-seeder';
import { Category } from '@/modules/product/entities/category.entity';
import * as path from 'path';
import { getRepository } from 'typeorm';
import { Seeder } from 'typeorm-seeding';
import * as fs from 'fs';
import { Product } from '@/modules/product/entities/product.entity';
import { ProductType } from '@/modules/product/entities/type.entity';
import axios, { AxiosResponse } from 'axios';
import { parse } from 'csv-parse';

export class ProductCreateSeed implements Seeder {
  public async run(): Promise<void> {
    const productRepository = getRepository(Product);
    const productCount = await productRepository.count();

    if (productCount > 0) {
      console.log('Продукты уже существуют, импорт пропущен');
      return;
    }

    const filePath = path.join(process.cwd(), 'products.csv');
    const products: CsvProduct[] = [];
    const parser = fs.createReadStream(filePath).pipe(
      parse({
        delimiter: ',',
        columns: true,
        skip_empty_lines: true,
        trim: true,
      }),
    );

    for await (const record of parser) {
      products.push(record as CsvProduct);
    }

    const uploadDir = path.join(process.cwd(), 'uploads');
    fs.mkdirSync(uploadDir, { recursive: true });

    for (const record of products) {
      let category = await getRepository(Category).findOne({
        where: { name: record.category },
      });
      if (!category) {
        category = getRepository(Category).create({ name: record.category });
        await getRepository(Category).save(category);
      }

      let productType = await getRepository(ProductType).findOne({
        where: { name: record.type },
      });
      if (!productType) {
        productType = getRepository(ProductType).create({
          name: record.type,
          category: category,
        });
        await getRepository(ProductType).save(productType);
      }

      let imgUrl: string | undefined = undefined;
      if (record.imgUrl) {
        try {
          const response: AxiosResponse<ArrayBuffer> = await axios.get(
            record.imgUrl,
            { responseType: 'arraybuffer' },
          );
          const buffer = Buffer.from(response.data);

          const matches = record.imgUrl.match(/\.([a-zA-Z]+)$/);
          const imageType = matches ? matches[1] : 'jpg';
          const fileName = `${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 5)}.${imageType}`;
          const filePath = path.join(uploadDir, fileName);

          fs.writeFileSync(filePath, buffer);
          imgUrl = `/uploads/${fileName}`;
        } catch {
          console.warn(`Не удалось загрузить изображение для ${record.name}`);
        }
      }

      const product = getRepository(Product).create({
        name: record.name,
        brand: record.brand,
        price: parseFloat(record.price),
        color: record.color,
        description: record.description,
        number_of_purchases: parseInt(record.numberOfPurchases, 10),
        category,
        type: productType,
        imageUrl: imgUrl,
      });

      await getRepository(Product).save(product);
      console.log(`Импортирован продукт: ${record.name}`);
    }

    console.log('Импорт данных завершён');
  }
}
