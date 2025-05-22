import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import 'reflect-metadata';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //jodi user post korar shomoy extra value na dite pare ta handle korte ai option use kora hoy jeno extra value post korle ta db te na jay.
    forbidNonWhitelisted: true, // jodi kono user extra value add korte chay tahole error show korbe 

    transform: true, // jodi body theke asa property k dto er instance banate chai tahole eita use korte hobe
    transformOptions: {
      enableImplicitConversion: true // by using this we do not need to implicitely tell the type transformation
    }

  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


// there are 3 types of module dependency they are: 1. Intra module dependency, 2. Iner Module Dependency & 3. Circular module dependency
 /* circular module dependency is like multiple module is dependent on each other. Its always avoidable but some times we need this when we have to work like authenticaiton */


 /* in inter module dependency we should export providers from which module should we use in another module. for example: tweet module a user information lagbe tarjonno user module a exports: [userServervice] use korte hobe. remember that only providers can exportable not a controller. */

 /* jodi amra user service k tweet module a use korte chai tahole import: [userModule]  k import korte hobe orthat export korbo service r import korbo module*/


 /* nest g controller [name] --no-spec command use to not create test file */



 /* circular dependency te module import korte hole forwardRef use korte hobe; jemon imports: [forwardRef(()=> AuthModule)] 
 */

 /* to use circular dependency we have to also use forWardRef in the controller or service: for example in the AuthService constructor(@Inject(forwardRef (()=> UserService) private readonly userService: UserService){} */