import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { firstName, lastName, mobileNumber, password } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            firstName,
            lastName,
            mobileNumber,
            password: hashedPassword,
        });

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string; mobileNumber: string }> {
        const { mobileNumber, password } = loginDto;
        const user = await this.userModel.findOne({ mobileNumber });

        if (!user) {
            throw new UnauthorizedException('Invalid mobileNumber or password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid mobileNumber or password');
        }

        const token = this.jwtService.sign({ id: user._id });

        return { token, mobileNumber: user.mobileNumber };
    }

    async getProfileDetail(mobileNumber: string): Promise<{ user: any }> {
        const user = await this.userModel.findOne({ mobileNumber }, { password: 0 }).exec();
        console.log("user => ", user);
      
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
        return { user };
      }
      
}