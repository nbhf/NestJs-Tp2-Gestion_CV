import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntites } from '../../Common/timestamp.entity';
import { CvEntity } from '../../cv/entities/cv.entity';

@Entity('user')
export class UserEntity extends TimestampEntites{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50,unique: true  })
  username: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

 
  @OneToMany(
    type => CvEntity,
    (cv) => cv.user,
    { 
      cascade: true,
      nullable: true,
      eager: true
    }
  )
    cvs: CvEntity[];
}