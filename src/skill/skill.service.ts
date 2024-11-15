import { Injectable } from '@nestjs/common';
import { SkillEntity } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,
  ) {}

  async createSkill(skillData: Partial<SkillEntity>): Promise<SkillEntity> {
    const skill = this.skillRepository.create(skillData);
    return this.skillRepository.save(skill);
  }
}
