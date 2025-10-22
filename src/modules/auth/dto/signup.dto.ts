import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length,  Matches,  MinLength,  ValidateIf } from "class-validator";
import { IsMatch } from "src/common/decorators/match.custom.decorator";


export class ResendConfirmEmailDto {
    @IsEmail()
    email:string;
}
export class ConfirmEmailDto extends ResendConfirmEmailDto{
  @Matches(/^\d{6}$/)
  code:string;
}

export class LoginBodyDto extends ResendConfirmEmailDto{
    @IsStrongPassword()
    password:string;
}


export class SignupDto extends LoginBodyDto{
    @IsNotEmpty()
    @IsString()
    @Length(2, 52 , {message:"username min length is 2 char and max length is 52 char"})
    username:string;

    

    // @Validate(MatchBetweenFields, {message:"confirm password not identical with password"})

    @ValidateIf((data:SignupDto) =>{
      return Boolean(data.password)
    })
    @IsMatch<string>(['password'],{
      message:'confirm password not identical with password'
    })
    confirmPassword:string
}


export class SignupQueryDto {

  @MinLength(2)
  @IsString()
  flag:string
}



