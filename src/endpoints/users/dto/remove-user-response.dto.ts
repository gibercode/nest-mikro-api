import { ApiProperty } from '@nestjs/swagger';

export class RemoveUserResponseDto {
  @ApiProperty({ example: true })
  success: boolean;
}
