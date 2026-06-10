import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'admin' })
  username: string;

  @ApiProperty({ example: true })
  isAdmin: boolean;

  static fromEntity(user: User): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
  }
}
