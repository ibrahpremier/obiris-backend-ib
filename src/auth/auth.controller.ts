import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty, ApiTags,ApiOperation } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
w
  @Post('signin')
  @ApiProperty(({ description: `Connexion d'un utilisateur ` }))
  @ApiOperation({ summary: 'Connexion d\'un utilisateur' })
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { code, password } = authCredentialsDto;
    try {
      if (!code || !password) {
        throw new HttpException('Vous devez renseigner un code et un mot de passe valide', HttpStatus.BAD_REQUEST);
      }
      const resp = await this.authService.signIn(code, password);
      if(resp.status=="success"){
        return {
          statusCode: HttpStatus.OK,
          user: resp.user,
          accessToken: resp.token,
        };
      } else{
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Code utilisateur ou mot de passe incorrect"
        };
      }
    } catch (error) {
      console.error(error);
      throw new HttpException('Une erreur est survenue', HttpStatus.UNAUTHORIZED);
    }
  }

  
  async signInOld(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { code, password } = authCredentialsDto;
     try {
      const accessToken = await this.authService.signIn(code, password);
      return {
        statusCode: HttpStatus.OK,
        accessToken,
        code: code,
      };
    } catch (error) {
      throw new HttpException('Une erreur est survenue', HttpStatus.UNAUTHORIZED);
    } 
  }
}