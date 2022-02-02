import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { verifyAccessToken } from 'src/utils/verifyAccessToken';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './user.dto';
import { User } from './user.entity';
import * as seed from './csvjson.json';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private productService: ProductService,
  ) {}

  find(): Promise<User[]> {
    return this.userRepository.createQueryBuilder('User').getMany();
  }
  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByField(key: string, value: string): Promise<User> {
    return this.userRepository.findOne({ [key]: value });
  }

  async update(id: string, data: UpdateUserInput): Promise<boolean> {
    const { affected } = await this.userRepository
      .createQueryBuilder('category')
      .update(User)
      .set({ ...data })
      .where('id = :id', { id })
      .execute();
    return affected ? true : false;
  }

  async register(userPhone: string): Promise<string> {
    return await this.userRepository
      .save({ phone: userPhone })
      .then((res) => {
        const { id } = res;
        return jwt.sign({ id }, process.env.JWT_SECRET);
      })
      .catch((err) => {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: err,
          },
          HttpStatus.CONFLICT,
        );
      });
  }

  async login(user: User): Promise<string> {
    const { id } = user;
    return jwt.sign({ id }, process.env.JWT_SECRET);
  }

  async getUserByToken(token: string): Promise<User> {
    const { id } = await verifyAccessToken(token);
    return this.findOne(id);
  }

  async seedUpdate(): Promise<boolean> {
    const seedParsed = JSON.parse(JSON.stringify(seed)).default;
    const transformedArray = seedParsed.map((item) => ({
      ...item,
      restaurant: '328f93ab-e779-40cc-b15e-db055910f341',
      description: 'Description placeholder',
      categories: [item.category],
    }));
    await transformedArray.forEach(async (product) => {
      const ds = await this.productService.create(product);
    });

    return true;
  }
}
