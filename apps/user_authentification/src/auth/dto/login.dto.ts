import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsString()
    readonly mobileNumber: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}