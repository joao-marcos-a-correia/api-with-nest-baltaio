import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async createToken() {
    const user: JwtPayload = {
      username: 'test@email.com',
    };

    const accessToken = this.jwtService.sign(user);

    return { expireIn: 3600, accessToken };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // return await this.accountService.findOneByUsername(payload.username);
    return payload;
  }
}
