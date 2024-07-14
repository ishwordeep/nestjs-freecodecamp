 npm i -g @nestjs/cli
 nest new project_name

<!-- to create module -->
 nest g module module_name


 <!-- PRISMA (for yarn)-->
 yarn add -D prisma
 yarn add -D @prisma/client
 
 npx prisma init

 <!-- to migrate -->
 npx prisma migrate dev

 <!-- to see tables of db -->
 npx prisma studio

 <!-- for validation -->
 yarn add class-validator class-transformer


 <!-- for password encryption: -->
 yarn add argon2

 <!-- config setup -->
 yarn add @nestjs/config