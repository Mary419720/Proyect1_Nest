import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>,
  ) {}

  async create(createFoodDto: CreateFoodDto) {
    const food = this.foodRepository.create(createFoodDto);
    return this.foodRepository.save(food);
  }

  async findAll() {
    const foods = await this.foodRepository.find();
    return foods;
  }

  async findOne(id: number) {
    const food = await this.foodRepository.findOneBy({ id });
    //mas acciones commplejas que con el findoneby no se pueden hacer
    //const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException(`No se encontro la comida con el ID ${id}`);
    }
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodRepository.findOneBy({ id });
    if (!food) {
      throw new NotFoundException(`No se encontro la comida con el ID ${id}`);
    }
    const updatedFood = this.foodRepository.merge(food, updateFoodDto);
    return this.foodRepository.save(updatedFood);
  }

  async remove(id: number) {
    const food = await this.foodRepository.findOneBy({ id });
    if (!food) {
      throw new NotFoundException(`No se encontro la comida con el ID ${id}`);
    }
    await this.foodRepository.delete(id);
    return { message: `La comida con el ID ${id} ha sido eliminada` };
    return food;
  }
}
