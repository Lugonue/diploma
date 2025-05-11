import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Product } from '../../modules/product/entities/product.entity';
import { Category } from '../../modules/product/entities/category.entity';
import { ProductType } from '../../modules/product/entities/type.entity';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';
import axios, { AxiosResponse } from 'axios';

interface CsvProduct {
  name: string;
  brand: string;
  price: string;
  color: string;
  description: string;
  numberOfPurchases: string;
  category: string;
  type: string;
  imgUrl: string;
}

export default class ProductSeeder implements Seeder {
  public async run(dataSource: DataSource, _factoryManager: SeederFactoryManager): Promise<void> {
    const productRepository = dataSource.getRepository(Product);
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
      let category = await dataSource.getRepository(Category).findOne({ where: { name: record.category } });
      if (!category) {
        category = dataSource.getRepository(Category).create({ name: record.category });
        await dataSource.getRepository(Category).save(category);
      }

      let productType = await dataSource.getRepository(ProductType).findOne({ where: { name: record.type } });
      if (!productType) {
        productType = dataSource.getRepository(ProductType).create({ name: record.type, category: category });
        await dataSource.getRepository(ProductType).save(productType);
      }

      let imgUrl: string | undefined = undefined;
      if (record.imgUrl) {
        try {
          const response: AxiosResponse<ArrayBuffer> = await axios.get(record.imgUrl, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(response.data);

          const matches = record.imgUrl.match(/\.([a-zA-Z]+)$/);
          const imageType = matches ? matches[1] : 'jpg';
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 5)}.${imageType}`;
          const filePath = path.join(uploadDir, fileName);

          fs.writeFileSync(filePath, buffer);
          imgUrl = `/uploads/${fileName}`;
        } catch {
          console.warn(`Не удалось загрузить изображение для ${record.name}`);
        }
      }

      const product = dataSource.getRepository(Product).create({
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

      await dataSource.getRepository(Product).save(product);
      console.log(`Импортирован продукт: ${record.name}`);
    }

    console.log('Импорт данных завершён');
  }
}
