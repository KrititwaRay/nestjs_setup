import { Controller, Post } from "@nestjs/common";

@Controller('user')
export class UserController {
    @Post('create')
    createUser() {
        console.log("create user called");
        return { message: 'User created successfully' };
    }
}