import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
