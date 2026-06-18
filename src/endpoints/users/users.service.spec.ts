import { ConflictException, NotFoundException } from '@nestjs/common';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { UsersService } from './users.service';

describe('UsersService', () => {
  const entityManager = {
    persist: jest.fn(),
    flush: jest.fn(),
    remove: jest.fn(),
  };

  const userRepository = {
    create: jest.fn(),
    getEntityManager: jest.fn(() => entityManager),
    findAll: jest.fn(),
    findOne: jest.fn(),
    assign: jest.fn(),
  };

  let service: UsersService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UsersService(userRepository as any);
  });

  it('creates a user', async () => {
    const dto = {
      name: 'Lara Giberson',
      email: 'lara@example.com',
      password: 'secret123',
    };
    const user = { id: 1, ...dto };

    userRepository.create.mockReturnValue(user);
    entityManager.flush.mockResolvedValue(undefined);

    await expect(service.create(dto)).resolves.toEqual(user);
    expect(entityManager.persist).toHaveBeenCalledWith(user);
  });

  it('throws conflict when email already exists', async () => {
    const dto = {
      name: 'Lara Giberson',
      email: 'lara@example.com',
      password: 'secret123',
    };

    userRepository.create.mockReturnValue(dto);
    entityManager.flush.mockRejectedValue(
      new UniqueConstraintViolationException(new Error('duplicate')),
    );

    await expect(service.create(dto)).rejects.toBeInstanceOf(ConflictException);
  });

  it('throws not found when a user does not exist', async () => {
    userRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toBeInstanceOf(NotFoundException);
  });
});
