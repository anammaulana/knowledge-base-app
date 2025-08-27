// src/auth/dto/register-user.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class RegisterUserDto {
    @IsEmail({}, { message: 'Email tidak valid' })
    @IsNotEmpty({ message: 'Email wajib diisi' })
    email: string;

    @IsString()
    // @MinLength(6, { message: 'Password minimal 6 karakter' })
    @IsNotEmpty({ message: 'Password wajib diisi' })
    password: string;

    // @IsEnum(Role, { message: 'Role tidak valid' })
    // @IsOptional() // supaya default dari entity tetap kepake (Role.USER)
    // role?: Role;
}
