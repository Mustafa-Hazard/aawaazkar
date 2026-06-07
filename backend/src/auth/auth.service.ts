import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const ADMIN_USER = { username: 'admin', password: 'aawaazkar' };

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async login(username: string, password: string) {
        if (username !== ADMIN_USER.username || password !== ADMIN_USER.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username, role: 'admin' };
        return {
            access_token: this.jwtService.sign(payload),
            username,
            role: 'admin',
        };
    }

    async validateToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}