import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }


    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        // TODO: generate JWT
        const payload = { id : user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            dataUser:payload
        };
    }

    // async register(email: string, password: string) {
    //     const hashed = await bcrypt.hash(password, 10);
    //     return this.usersService.create({ email, password: hashed });
    // }

    // async register(registerDto: RegisterUserDto) {
    //     const hashed = await bcrypt.hash(registerDto.password, 10);

    //     return this.usersService.create({
    //         ...registerDto,
    //         password: hashed,
    //     });
    // }

    async register(registerDto: RegisterUserDto) {
        // cek email
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new BadRequestException('Email already registered');
        }

        // hash password
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        // simpan user
        const user = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
        });

        // generate token JWT
        const payload = { sub: user.id, email: user.email, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
            dataUser: payload
        };
    }
}
