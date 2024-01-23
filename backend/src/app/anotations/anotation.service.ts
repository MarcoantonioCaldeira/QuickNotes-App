import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateAnotationDto } from './dto/anotation.dto';
import { Note } from 'prisma/src/db/generated/client';


@Injectable()
export class AnotationService {

  private readonly logger = new Logger(AnotationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async insertNote(criateAnotationDto: CreateAnotationDto): Promise<{ message: string, anotation: Note }> {
    
    const permittedCategory = ['0', '1', '2'];

    if (!permittedCategory.includes(criateAnotationDto.category)) {
        throw new BadRequestException('Categoria inválida. Deve ser 0, 1 ou 2.');
    }

    try {
        const anotation = await this.prisma.note.create({
            data: {
                subject: criateAnotationDto.subject,
                potential: criateAnotationDto.potential,
                category: criateAnotationDto.category,
                term: criateAnotationDto.term,
            },
        });

        return {
            message: 'Anotação criada com sucesso',
            anotation,
        };
    } catch (error) {
        this.logger.error(`Erro ao criar a anotação: ${error.message}`, error.stack);
        throw new HttpException('Erro ao criar a anotação', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


  
  async getAllAnotations(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }


  async deleteAnotations(id_anotation: number):Promise<{ message: string, anotation: Note }> {

    const id = parseInt(id_anotation.toString(), 10);
    
    try{

      const deleteAnotation = await this.prisma.note.delete({
        where: {
          id_anotation: id,
        },
      });

      return {
        message:"Anotação deletada com sucesso",
        anotation: deleteAnotation,
      }
      
    }catch(error){
        this.logger.error(`Erro ao deletar a anotação: ${error.message}`, error.stack);
        throw new HttpException('Erro ao deletar a anotação', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }



  async updateAnotations(id_anotation: number, createAnotationDto: CreateAnotationDto): Promise<{ message: string, anotation: Note } | { message: string }> {
    const id = parseInt(id_anotation.toString(), 10);
  
    const anotation = await this.prisma.note.findUnique({
      where: {
        id_anotation: id,
      },
    });
  
    if (!anotation) {
      throw new NotFoundException(`Anotação com ID ${id_anotation} não encontrada.`);
    }
  
    const updatedAnotation = await this.prisma.note.update({
      where: { id_anotation: id },
      data: createAnotationDto,
    });
  
    return {
      message: 'Anotação atualizada com sucesso',
      anotation: updatedAnotation,
    };
  }

}


