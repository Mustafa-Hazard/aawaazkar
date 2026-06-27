import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(private jwtService: JwtService) { }

    onModuleInit() {
        if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD_HASH) {
            throw new Error(
                'Missing ADMIN_USERNAME or ADMIN_PASSWORD_HASH in .env — refusing to start without admin credentials configured.',
            );
        }
    }

    async login(username: string, password: string) {
        const validUsername = process.env.ADMIN_USERNAME;
        const validPasswordHash = process.env.ADMIN_PASSWORD_HASH as string;

        if (username !== validUsername) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatches = await bcrypt.compare(password, validPasswordHash);
        if (!passwordMatches) {
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