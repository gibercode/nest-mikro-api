import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Lara Giberson' })
  name: string;

  @ApiProperty({ example: 'lara@example.com' })
  email: string;

  @ApiProperty({ example: 'secret123' })
  password: string;

  @ApiProperty({ example: '2026-06-10T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-06-10T12:00:00.000Z' })
  updatedAt: Date;
}
