import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches, MinLength } from 'class-validator';

export const passwordRegexp =
  /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{7,}/g;

export const passwordRegexp5 = /(?=.*[A-Z])/;
export const passwordRegexp4 = /(?=.*[a-z])/;
export const passwordRegexp3 = /(?=.*[!@#$%^&*_])/;
export const passwordRegexp2 = /(?=.*[0-9])/;

// (?=.*[0-9]) - строка содержит хотя бы одно число;
// (?=.*[!@#$%^&*_]) - строка содержит хотя бы один спецсимвол;
// (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
// (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
// [0 - 9a - zA - Z!@#$%^&*]{ 6,} - строка состоит не менее, чем из 6 вышеупомянутых символов

export class SignUpDto {
  @ApiProperty({ example: 'nickname користувача' })
  @IsString({ message: 'Повинен бути рядком' })
  readonly username: string;

  @ApiProperty({ example: 'Пароль користувача' })
  @IsString({ message: 'Повинен бути рядком' })
  // @Matches(passwordRegexp, { message: 'Не валідний пароль' })
  @Matches(passwordRegexp2, { message: 'Пароль повинен містити одну цифру' })
  @Matches(passwordRegexp3, {
    message: 'Пароль повинен містити хотяби один сцец символ',
  })
  @Matches(passwordRegexp4, {
    message: 'Пароль повинен містити хотяби одиу велику літеру',
  })
  @Matches(passwordRegexp5, {
    message: 'Пароль повинен містити хотяби одиу маленьку літеру',
  })
  @MinLength(7, { message: 'Мінімум 7 симфолів' })
  readonly password: string;

  @ApiProperty({ example: 'Email користувача' })
  @IsString({ message: 'Повинен бути рядком' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
}
