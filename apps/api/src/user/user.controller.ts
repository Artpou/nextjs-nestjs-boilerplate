import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
