import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class HelloWorldDto {
  @IsString()
  @Expose()
  message: string;
}
