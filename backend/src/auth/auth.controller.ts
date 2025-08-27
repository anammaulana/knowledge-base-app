import { Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponseDto } from 'src/common/dto/api.response.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // @Post('register')
    // async register(@Body() body: { email: string; password: string; }) {
    //     return this.authService.register(body.email, body.password);
    // }

    @Post('register')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async registerSecond(@Body() dto: RegisterUserDto) {
        return this.authService.register(dto);
    }

    @Post('register')
    async register(@Body() RegisterUserDto: RegisterUserDto) {
        const token = await this.authService.register(RegisterUserDto);
        return ApiResponseDto.success('Register Success', token);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const token = await this.authService.login(loginDto);
        return ApiResponseDto.success('Login success', token);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    profile(@Request() req) {
        return req.user;
    }
}
