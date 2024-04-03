import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}



  async signIn(code: number, password: string): Promise<any> {
    const user = await this.validateUser(code, password);
    if (!user) {
      // throw new UnauthorizedException('Code utilisateur ou mot de passe incorrect');
      return {status: "echec"}
    }
    const payload = { userId: user.id, code: user.code };
    return {status: "success",user: user, token: this.jwtService.sign(payload)}
  }

  async validateUser(code: number, password: string): Promise<any> {
    const user = await this.usersService.findByCode(code);
    if (user && await user.validatePassword(password)) {
      return user;
    }
    return null;
  }

    
  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verify(token, {
        secret: 'Findel*007',
      });
      const user = await this.validateUser(decoded.code, decoded.userId);
      return user;
    } catch (err) {
      throw new Error('Token invalid');
    }
  }
}
