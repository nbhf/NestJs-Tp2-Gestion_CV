import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { CvEntity } from '../../cv/entities/cv.entity';
import { TimestampEntites } from '../../Common/timestamp.entity';

@Entity('skill')
export class SkillEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: false })
  designation: string;

  @ManyToMany(
    () => CvEntity,
    (cv) => cv.skills,
    {
      cascade: true,
      eager: true
    }
  )
  cvs: CvEntity[];
}
