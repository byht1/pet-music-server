import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

const passwordRegexp =
  /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{7,}/g;

// (?=.*[0-9]) - строка содержит хотя бы одно число;
// (?=.*[!@#$%^&*]) - строка содержит хотя бы один спецсимвол;
// (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
// (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
// [0 - 9a - zA - Z!@#$%^&*]{ 6,} - строка состоит не менее, чем из 6 вышеупомянутых символов

export class SignUpDto {
  @ApiProperty({ example: 'nickname користувача' })
  @IsString({ message: 'Повинен бути рядком' })
  readonly username: string;

  @ApiProperty({ example: 'Пароль користувача' })
  @IsString({ message: 'Повинен бути рядком' })
  @Matches(passwordRegexp, { message: 'Не валідний пароль' })
  readonly password: string;

  @ApiProperty({ example: 'Email користувача' })
  @IsString({ message: 'Повинен бути рядком' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
}
