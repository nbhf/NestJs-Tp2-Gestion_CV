import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';
import { CvService } from 'src/cv/cv.service';
import { SkillService } from 'src/skill/skill.service';
import { randFullName, randEmail, randJobTitle, randNumber, randFilePath } from '@ngneat/falso';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // Injection des services
  const userService = app.get(UserService);
  const cvService = app.get(CvService);
  const skillService = app.get(SkillService);

  console.log('Seeding data...');

  // Générer des utilisateurs fictifs
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await userService.createUser({
      username: randFullName(),
      email: randEmail(),
      password: 'password', 
    });
    users.push(user);
  }

  // Générer des compétences fictives
  const skillNames = ['JavaScript', 'TypeScript', 'NestJS', 'Angular', 'React'];
  const skills = [];
  for (const name of skillNames) {
    const skill = await skillService.createSkill({ designation: name });
    skills.push(skill);
  }

  // Générer des CVs fictifs
  for (let i = 0; i < 10; i++) {
    const randomUser = users[randNumber({ min: 0, max: users.length - 1 })];
    const randomSkills = skills.slice(0, randNumber({ min: 1, max: skills.length }));

    const cvData = {
      name: randFullName(),
      firstname: randFullName(),
      age: randNumber({ min: 18, max: 60 }),
      cin: randNumber({ min: 10000000, max: 99999999 }),
      job: randJobTitle(),
      path: randFilePath(),
      user: randomUser,
      skills: randomSkills,  
    };

    await cvService.createCv(cvData);
  }

  console.log('Seeding completed successfully!');
  await app.close();
}

bootstrap();
