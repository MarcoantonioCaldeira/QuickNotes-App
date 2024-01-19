import { Controller, Get, Post, Body, HttpException, HttpStatus, Delete, UseGuards, Param, BadRequestException, NotFoundException, Patch } from '@nestjs/common';
import { AnotationService } from './anotation.service';
import { CreateAnotationDto } from './dto/anotation.dto';
import { Note } from 'prisma/src/db/generated/client';


@Controller('anotations')
export class AnotationController {

  constructor(
    private readonly anotationService: AnotationService,
  ) {}

  @Get('list')
  async findAnotation(): Promise<Note[]> {
    try {
      const todosPedidos = await this.anotationService.getAllAnotations();
      return todosPedidos;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('create')
  async createAnotation(@Body() createAnotationDto: CreateAnotationDto): Promise<{ mensagem: string, anotation: Note } | { message: string }> {
    try {
      const response = await this.anotationService.insertNote(createAnotationDto);
      return {
        mensagem: 'Anotação criada com sucesso',
        anotation: response.anotation
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete/:id_anotation')
  async deleteAnotation(@Param('id_anotation') id_anotation: number): Promise<{ message: string, anotation: Note } | { message: string }> {
    try{
      const response = await this.anotationService.deleteAnotations(id_anotation);
      return {
        message:"Anotação deletada com sucesso",
        anotation: response.anotation
      };
    } catch (error) {

      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Patch('update/:id_anotation')
  async updateAnotation(@Param('id_anotation') id_anotation: number, @Body() createAnotationDto: CreateAnotationDto): Promise<{ message: string, anotation?: Note } | { message: string }> {
    try {
      const response: { message: string, anotation?: Note } = await this.anotationService.updateAnotations(id_anotation, createAnotationDto);
      const { anotation, message } = response;
      return {
        message: 'Anotação atualizada com sucesso',
        anotation: anotation as Note,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  
}
