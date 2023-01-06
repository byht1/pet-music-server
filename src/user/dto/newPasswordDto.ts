import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

export const passwordRegexp =
  /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_]{7,}/g;

export const passwordRegexp5 = /(?=.*[A-Z])/;
export const passwordRegexp4 = /(?=.*[a-z])/;
export const passwordRegexp3 = /(?=.*[!@#$%^&*_])/;
export const passwordRegexp2 = /(?=.*[0-9])/;

export class NewPasswordDto {
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
}
