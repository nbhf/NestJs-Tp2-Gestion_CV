import { Injectable, NotFoundException } from '@nestjs/common';
import { CvEntity } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private readonly cvRepository: Repository<CvEntity>,
  ) {}

  //add
  async createCv(cvData: Partial<CvEntity>): Promise<CvEntity> {
    //const cv = this.cvRepository.create(cvData);
    return this.cvRepository.save(cvData);
  }

//getall
  async getCvs(): Promise<CvEntity[]> {
      return await this.cvRepository.find();
  }

  // Récupérer un CV par son id avec les relations
  async findOne(id: number): Promise<CvEntity> {
    const cv = await this.cvRepository.findOne({
      where: { id }
    });
    if (!cv) {
      throw new NotFoundException(`CV with id ${id} not found`);
    }
    return cv;
  }



  //update
  async updateCv(id: number, cvData: any): Promise<CvEntity> {
    const cv = await this.cvRepository.findOne({where: { id }});
  
    // If the CV does not exist, throw a NotFoundException
    if (!cv) {
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
    }
  
    // Update the CV entity with the new data
    Object.assign(cv, cvData);
  
    // Save the updated CV entity to the database
    return await this.cvRepository.save(cv);
  }
  


   // Supprimer un CV
   async remove(id: number): Promise<any> {
    const cv = await this.cvRepository.findOne({ where: { id } });
    if (!cv) {
      throw new NotFoundException(`CV with id ${id} not found`);
    }
    return this.cvRepository.remove(cv); // Supprime le CV
   
  }
}
