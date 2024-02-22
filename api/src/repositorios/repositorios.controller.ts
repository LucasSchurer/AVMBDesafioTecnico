import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { RepositoriosService } from './repositorios.service';
import { Repositorio } from 'src/schemas/repositorio.schema';

@Controller('repositorios')
export class RepositoriosController {
  constructor(private readonly repositoriosService: RepositoriosService) {}

  @Get()
  async getAll(): Promise<Repositorio[]> {
    return await this.repositoriosService.getAll()
  }
  
  @Get(':id')
  async get(@Param('id') id: Number): Promise<Repositorio> {
    return await this.repositoriosService.get(id)
  }
  
  @Post()
  async create(@Body() repositorio: Repositorio) {
    return await this.repositoriosService.create(repositorio)
  }

  @Post(':id')
  async update(@Param('id') id: Number, @Body() repositorio: Repositorio) {
    return await this.repositoriosService.update(id, repositorio)
  }

  @Delete(':id')
  async delete(@Param('id') id: Number) {
    return await this.repositoriosService.delete(id)
  }

  @Delete()
  async deleteAll() {
    return await this.repositoriosService.deleteAll()
  }
}
