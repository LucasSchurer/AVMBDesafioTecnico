import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { EnvelopesService } from './envelopes.service';
import { Documento, Envelope } from 'src/schemas/envelope.schema';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Envelopes')
@Controller('envelopes')
export class EnvelopesController {
  constructor(private readonly envelopesService: EnvelopesService) {}

  @ApiOkResponse({
    description: 'Lista dos envelopes do usuário atual',
    type: Envelope,
    isArray: true
  })
  @ApiOperation({summary: 'Recupera todos os envelopes do usuário atual'})
  @Get()
  async getAll(): Promise<Envelope[]> {
    return await this.envelopesService.getAll(null)
  }

  @ApiParam({
    name: 'id',
    description: 'ID do repositório'
  })
  @ApiOkResponse({
    description: 'Lista dos envelopes do usuário atual contidos no repositório',
    type: Envelope,
    isArray: true
  })
  @ApiOperation({summary: 'Recupera todos os envelopes do usuário atual em um determinado repositório'})
  @Get('repositorio/:id')
  async getAllFromRepositorio(@Param('id') id: Number): Promise<Envelope[]> {
    return await this.envelopesService.getAll(id)
  }

  @ApiOkResponse({
    description: 'Envelope com o ID enviado',
    type: Envelope
  })
  @ApiParam({
    name: 'id',
    description: 'ID do envelope'
  })
  @ApiOperation({summary: 'Recupera o envelope com o ID enviado'})
  @Get(':id')
  async get(@Param('id') id: Number) : Promise<Envelope> {
    return await this.envelopesService.get(id)
  }

  @ApiBody({
    type: Envelope,
    examples: {
      1: {
        value: {
          descricao: 'Novo Envelope',
          listaDocumentos: {
            Documento: [
              {
                nomeArquivo: 'Arquivo1.pdf',
                mimeType: 'application/pdf',
                conteudo: 'JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PC9...'
              }
            ]
          },
          Repositorio: {
            id: 0
          }
        }
      }
    },
    description: 'Caso um repositório não seja definido, o primeiro (caso exista) será utilizado. Caso nenhum repositório exista, um novo será criado e utilizado'
  })
  @ApiOperation({summary: 'Cria um novo envelope'})
  @Post()
  async create(@Body() envelope: Envelope) {
    return await this.envelopesService.create(envelope)
  }

  @ApiParam({
    name: 'id',
    description: 'ID do envelope'
  })
  @ApiOperation({summary: 'Deleta o envelope com o ID enviado'})
  @Delete(':id')
  async delete(@Param('id') id: Number) {
    return await this.envelopesService.delete(id)
  }

  @ApiOperation({summary: 'Deleta todos os envelopes do usuário atual'})
  @Delete()
  async deleteAll() {
    return await this.envelopesService.deleteAll(null)
  }

  @ApiParam({
    name: 'id',
    description: 'ID do repositório'
  })
  @ApiOperation({summary: 'Deleta todos os envelopes de um determinado repositório do usuário atual'})
  @Delete('repositorio/:id')
  async deleteFromRepositorio(@Param('id') id: Number) {
    return await this.envelopesService.deleteAll(id)
  }

  @ApiBody({
    type: Body,
    examples: {
      1: {
        value: {
          idEnvelope: 0,
          motivo: 'Motivo para cancelamento',
          anularAssinaturas: 'S'
        }
      }
    }
  })
  @ApiOperation({summary: 'Cancela um envelope'})
  @Post('cancelarEnvelope')
  async cancelEnvelope(@Body() data) {
    return await this.envelopesService.cancelEnvelope(data)
  }

  @ApiParam({
    name: 'id',
    description: 'ID do repositório'
  })
  @ApiOperation({summary: 'Conclui o envelope com o ID enviado'})
  @Post('concluirEnvelope/:id')
  async finishEnvelope(@Param('id') id: Number) {
    return await this.envelopesService.finishEnvelope(id)
  }

  @ApiParam({
    name: 'id',
    description: 'ID do repositório'
  })
  @ApiOperation({summary: 'Arquiva o envelope com o ID enviado'})
  @Post('arquivarEnvelope/:id')
  async archiveEnvelope(@Param('id') id: Number) {
    return await this.envelopesService.archiveEnvelope(id)
  }

  @ApiParam({
    name: 'id',
    description: 'ID do repositório'
  })
  @ApiOperation({summary: 'Desarquiva o envelope com o ID enviado'})
  @Post('desarquivarEnvelope/:id')
  async unarchiveEnvelope(@Param('id') id: Number) {
    return await this.envelopesService.unarchiveEnvelope(id)
  }

  @ApiBody({
    type: Body,
    examples: {
      1: {
        value: {
          Envelope: {
            id: 0
          },
          nomeArquivo: 'Arquivo1.pdf',
          mimeType: 'application/pdf',
          conteudo: 'JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PC9...'
        }
      }
    }
  })
  @ApiOperation({summary: 'Insere um documento em um envelope'})
  @Post('createDocumento')
  async createDocumento(@Body() documento: Documento) {
    return await this.envelopesService.createDocumento(documento)
  }
}
