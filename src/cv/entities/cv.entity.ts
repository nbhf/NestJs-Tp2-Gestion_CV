import { ManyToOne, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { TimestampEntites } from '../../Common/timestamp.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { SkillEntity } from 'src/skill/entities/skill.entity';


@Entity('cv')
export class CvEntity extends TimestampEntites {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 50 })
  name: string;

  @Column({ length: 50 })
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: number;

  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne(
    type => UserEntity,
    (user) => user.cvs,
    {
      cascade: ['insert', 'update'],

      nullable: true
    }
  )
  user: UserEntity;

  @ManyToMany(
    () => SkillEntity,
    (skill) => skill.cvs,
    {


    }
  )
  @JoinTable({
    name: "cv_skills"
  })
  skills: SkillEntity[];


}