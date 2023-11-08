import {
  UseGuards,
  Controller,
  Post,
  Body,
  Req,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() LoginUserDTO: LoginDTO) {
    return this.authService.login(LoginUserDTO);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req: any) {
    return this.authService.logout(req.data);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    console.log(req['data'], 'req.user');
    return req['data'];
  }
}
