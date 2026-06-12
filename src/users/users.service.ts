import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register.dto.';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(user: RegisterUserDto) {
    const exist = await this.userRepo.findOne({
      where: { email: user.email },
    });

    if (exist) {
      throw new ConflictException('El email ya está registrado');
    }

    const hashed = await bcrypt.hash(user.password, 10);

    const newUser = this.userRepo.create({
      ...user,
      password: hashed,
    });

    return this.userRepo.save(newUser);
  }

  async findByEmail(email: string) {
    return this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findById(id: number) {
    return this.userRepo.findOne({
      where: { id },
    });
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users.map((u) => {
      const { password, ...rest } = u as any;
      return rest;
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(
        `No se encontró el usuario con el ID ${id}`,
      );
    }

    const { password, ...rest } = user as any;
    return rest;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(
        `No se encontró el usuario con el ID ${id}`,
      );
    }

    const updated = this.userRepo.merge(user, updateUserDto);
    const saved = await this.userRepo.save(updated);

    const { password, ...rest } = saved as any;
    return rest;
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(
        `No se encontró el usuario con el ID ${id}`,
      );
    }

    await this.userRepo.delete(id);

    return {
      message: `Usuario con el ID ${id} eliminado`,
    };
  }
}