import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { EnvelopesService } from './envelopes.service';
import { Documento, Envelope } from 'src/schemas/envelope.schema';

@Controller('envelopes')
export class EnvelopesController {
  constructor(private readonly envelopesService: EnvelopesService) {}

  @Get()
  async getAll(): Promise<Envelope[]> {
    return await this.envelopesService.getAll(null)
  }

  @Get('repositorio/:id')
  async getAllFromRepositorio(@Param('id') id: Number): Promise<Envelope[]> {
    return await this.envelopesService.getAll(id)
  }

  @Get(':id')
  async get(@Param('id') id: Number) : Promise<Envelope> {
    return await this.envelopesService.get(id)
  }

  @Post()
  async create(@Body() envelope: Envelope) {
    return await this.envelopesService.create(envelope)
  }

  @Delete(':id')
  async delete(@Param('id') id: Number) {
    return await this.envelopesService.delete(id)
  }

  @Delete()
  async deleteAll() {
    return await this.envelopesService.deleteAll(null)
  }

  @Delete('repositorio/:id')
  async deleteFromRepositorio(@Param('id') id: Number) {
    return await this.envelopesService.deleteAll(id)
  }

  @Post('cancelarEnvelope')
  async cancelEnvelope(@Body() data) {
    return await this.envelopesService.cancelEnvelope(data)
  }

  @Post('concluirEnvelope/:id')
  async finishEnvelope(@Param('id') id: Number) {
    return await this.envelopesService.finishEnvelope(id)
  }

  @Post('arquivarEnvelope/:id')
  async archiveEnvelope(@Param('id') id: Number) {
    return await this.envelopesService.archiveEnvelope(id)
  }

  @Post('desarquivarEnvelope/:id')
  async unarchiveEnvelope(@Param('id') id: Number) {
    return await this.envelopesService.unarchiveEnvelope(id)
  }

  @Post('createDocumento')
  async createDocumento(@Body() documento: Documento) {
    return await this.envelopesService.createDocumento(documento)
  }
}
