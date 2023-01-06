import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class NewForgottenPasswordDto {
  @ApiProperty({ example: 'Email користувача' })
  @IsString({ message: 'Повинен бути рядком' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
}
