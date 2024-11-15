import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  //add
  @Post()
  create(@Body() createCvDto: CreateCvDto) {
    return this.cvService.createCv(createCvDto);
  }

  //get all
  @Get()
  async getAllCvs(): Promise<CvEntity[]> {
    return await this.cvService.getCvs();
  }

    // Route pour obtenir un CV par son id
    @Get(':id')
    findOne(@Param('id') id: number): Promise<CvEntity> {
      return this.cvService.findOne(id);
    }


    //update
    @Put(':id')
    async updateCv(
      @Param('id') id: number,       
      @Body() cvData: any        // Capture the update data from the request body
    ): Promise<CvEntity> {
        return await this.cvService.updateCv(id, cvData);
    }
  

    // supprimer un CV
    @Delete(':id')
    remove(@Param('id') id: number): Promise<any> {
      return this.cvService.remove(id);
    }


}
