import { Body, Controller , Delete, Get, Param, Post, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService :  UserService){}

    @Get()
    async getAllUsers() : Promise<User[]>{
        return this.userService.findAll();
    }


    @Post()
    async createUser(
        @Body()
        user : CreateUserDto
    ): Promise<User> {
        return this.userService.create(user)
    }

    @Get(':id')
    async getUsers(
        @Param('id')
        id:string
    ) : Promise<User>{
        return this.userService.findById(id);
    }

    @Put(':id')
    async updateUser(
        @Param('id')
        id:string,
        @Body()
        user : UpdateUserDto,
    ) : Promise<User>{
        return this.userService.updateById(id , user);
    }

    // @Delete(':id')
    // async deleteUser(
    //     @Param('id')
    //     id:string
    // ) : Promise<User>{
    //     return this.userService.deleteById(id);
    // }
}
