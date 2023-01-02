export class NewUserDto {
  readonly username: string;
  readonly password?: string;
  readonly email: string;
  readonly method_registration?: 'jwt' | 'google';
}
