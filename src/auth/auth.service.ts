import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
//AuthService.register() handles hashing and calls UsersService.create().
//UsersService.create() just inserts into DB
  async register(
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ) {
    const hashed = await bcrypt.hash(password, 10);
    return this.usersService.create({ name, email, password: hashed, role });
  }

  async login(email: string, password: string) {
  const user = await this.usersService.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { sub: user.id, email: user.email, role: user.role };

  return {
    access_token: this.jwtService.sign(payload),
    role: user.role,  
    email: user.email
  };
}

}
