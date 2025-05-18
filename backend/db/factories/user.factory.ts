import { define } from 'typeorm-seeding';
import { User } from '../../src/modules/user/entities/user.entity';

define(User, () => {
  const user = new User();
  return user;
});
