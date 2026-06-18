import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  EntityRepository,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import { User } from '../../entities/User.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const em = this.userRepository.getEntityManager();
    em.persist(user);

    try {
      await em.flush();
      return user;
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        throw new ConflictException(
          `Email ${createUserDto.email} is already registered`,
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    this.userRepository.assign(user, updateUserDto);
    await this.userRepository.getEntityManager().flush();
    return user;
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const user = await this.findOne(id);
    const entityManager = this.userRepository.getEntityManager();
    entityManager.remove(user);
    await entityManager.flush();
    return { success: true };
  }
}
