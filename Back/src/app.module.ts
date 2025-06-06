import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { CourseModule } from './course/course.module';
import { ChapterModule } from './chapter/chapter.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Course } from './course/entities/course.entity';
import { Chapter } from './chapter/entities/chapter.entity';
import { Category } from './category/entities/category.entity';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { ProtectedModule } from './protected/protected.module';
// import { AdminModule } from './admin/admin.module'; // Ensure this module exists or correct the path
import { FileUploadModule } from './upload/upload.module';
import { CertificateModule } from './certificate/certificate.module';
import { Certificate } from './certificate/entities/certificate.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User,Course,Chapter, Category,Role,Certificate],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CourseModule,
    ChapterModule,
    UserModule,
    CategoryModule,
    AuthModule,
    ProtectedModule,
    CertificateModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
