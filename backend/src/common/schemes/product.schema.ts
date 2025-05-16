export const ProductSchema = {
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      brand: { type: 'string' },
      price: { type: 'number' },
      category_id: { type: 'number' },
      type_id: { type: 'number' },
      color: { type: 'string', nullable: true },
      description: { type: 'string', nullable: true },
      image: { type: 'string', format: 'binary', nullable: true },
    },
  },
};
