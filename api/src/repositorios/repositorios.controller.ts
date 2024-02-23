import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RepositoriosService } from './repositorios.service';
import { Repositorio } from 'src/schemas/repositorio.schema';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Repositorios')
@Controller('repositorios')
export class RepositoriosController {
  constructor(private readonly repositoriosService: RepositoriosService) {}

  @ApiOkResponse({
    description: 'Lista dos repositórios do usuário atual',
    type: Repositorio,
    isArray: true
  })
  @ApiOperation({summary: 'Recupera todos os repositórios do usuário atual'})
  @Get()
  async getAll(): Promise<Repositorio[]> {
    return await this.repositoriosService.getAll()
  }
  
  @ApiOkResponse({
    description: 'Repositório com o ID enviado',
    type: Repositorio
  })
  @ApiParam({
    name: 'id',
    description: 'ID do repositório'
  })
  @ApiOperation({summary: 'Recupera o repositório com o ID enviado'})
  @Get(':id')
  async get(@Param('id') id: Number): Promise<Repositorio> {
    return await this.repositoriosService.get(id)
  }
  
  @ApiBody({
    type: Repositorio,
    examples: {
      1: {
        value: {nome: 'Meus Envelopes'}
      }
    }
  })
  @ApiOperation({summary: 'Cria um novo repositório'})
  @Post()
  async create(@Body() repositorio: Repositorio) {
    return await this.repositoriosService.create(repositorio)
  }

  @ApiBody({
    type: Repositorio,
    examples: {
      1: {
        value: {nome: 'Meus Envelopes'}
      }
    }
  })
  @ApiParam({
    name: 'id',
    description: 'ID do repositório'
  })
  @ApiOperation({summary: 'Atualiza o repositório com o ID enviado'})
  @Post(':id')
  async update(@Param('id') id: Number, @Body() repositorio: Repositorio) {
    return await this.repositoriosService.update(id, repositorio)
  }

  @ApiParam({
    name: 'id',
    description: 'ID do repositório'
  })
  @ApiOperation({summary: 'Deleta o repositório com o ID enviado'})
  @Delete(':id')
  async delete(@Param('id') id: Number) {
    return await this.repositoriosService.delete(id)
  }

  @ApiOperation({summary: 'Deleta todos os repositórios do usuário'})
  @Delete()
  async deleteAll() {
    return await this.repositoriosService.deleteAll()
  }
}
