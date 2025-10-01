import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/users/user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService, 
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      name,
      email,
      password: hashed,
      role,
    });

    await this.mailService.sendMail(
      user.email,
      'Welcome to Movie App',
      `Hi ${user.name}, your account has been created successfully!`
    );

    return { message: 'Email sent successfully!' };
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
      email: user.email,
      userId: user.id,
    };
  }
}

//AuthService.register() handles hashing and calls UsersService.create().
//UsersService.create() just inserts into DB