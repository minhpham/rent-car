import { IsNotEmpty, IsEmail, Length, IsString } from 'class-validator';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class newUserDto {
  @IsNotEmpty({ message: 'Please enter name' })
  @IsString({ message: 'Please enter valid name' })
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Please enter password' })
  @Length(1, 50, {
    message: 'Password length Must be between 1 and 50 charcters',
  })
  password: string;
}
