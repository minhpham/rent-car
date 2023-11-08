import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() email: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() first_name: string;
  @IsNotEmpty() last_name: string;
  @IsNotEmpty() phone_number: string;

  job_title: string;
  gender: number;
  company: string;
  avatar_url: string;
}
