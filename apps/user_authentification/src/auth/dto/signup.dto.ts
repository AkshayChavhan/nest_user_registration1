import { IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @IsNotEmpty()
    @IsString()
    readonly mobileNumber: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}