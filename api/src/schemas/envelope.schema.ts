import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { RepositorioId } from './repositorio.schema';
import { UsuarioId } from './usuario.schema';
import { ApiProperty } from '@nestjs/swagger';

export class EnvelopeId {
  constructor(id: Number) {
    this.id = id
  }

  @Prop()
  id: Number
}

export class ConfigAssinatura {
  @Prop({type: String, required: true})
  emailSignatario: String

  @Prop({type: String, required: true})
  nomeSignatario: String

  @Prop({type: String, required: false})
  celularSignatario: String
}

export class SignatarioEnvelope {
  @Prop()
  Envelope: EnvelopeId

  @Prop({type: Number})
  ordem: Number

  @Prop({type: ConfigAssinatura, required: true})
  ConfigAssinatura: ConfigAssinatura
}

export class Documento {
  @Prop()
  Envelope: EnvelopeId

  @Prop({type: String, required: true})
  nomeArquivo: string
  
  @Prop({type: String, required: true})
  conteudo: string

  @Prop({type: String, required: true})
  mimeType: string
}

@Schema()
export class Envelope {
  @ApiProperty({description: 'ID do envelope'})
  @Prop({required: true})
  id: Number

  @ApiProperty({description: 'ID do repositório que o envelope pertence',  example: {Repositorio: {id: 0}}})
  @Prop()
  Repositorio: RepositorioId

  @ApiProperty({description: 'ID do usuário dono do envelope',  example: {Usuario: {id: 0}}})
  @Prop()
  Usuario: UsuarioId

  @ApiProperty({description: 'Descrição do envelope',  example: 'Meu Envelope'})
  @Prop()
  descricao: string

  @ApiProperty({description: 'Conteúdo em base64 do envelope',  example: 'JVBERi0xLjUNCiW1t...'})
  @Prop()
  conteudo: string

  @Prop()
  listaDocumentos: Documento[]

  @Prop()
  listaSignatariosEnvelope: SignatarioEnvelope[]

  @Prop()
  incluirHashTodasPaginas: string

  @Prop()
  permitirDespachos: string

  @Prop()
  usarOrdem: string
  
  @Prop()
  hashSHA256: string

  @Prop()
  hashSHA512: string

  @Prop()
  mensagem: string

  @Prop()
  mensagemObservadores: string

  @Prop()
  mensagemNotificacaoSMS: String

  @Prop()
  motivoCancelamento: string

  @Prop()
  numeroPaginas: string

  @Prop()
  status: string

  @Prop()
  dataHoraCriacao: string

  @Prop()
  dataExpiracao: String

  @Prop()
  horaExpiracao: String

  @Prop()
  dataHoraAlteracao: string

  @Prop()
  objetoContrato: string

  @Prop()
  statusContrato: string

  @Prop()
  numContrato: string

  @Prop()
  descricaoContratante: string

  @Prop()
  descricaoContratado: string

  @Prop()
  bloquearDesenhoPaginas: string

  @Prop()
  Envelope: string
}

export const EnvelopeSchema = SchemaFactory.createForClass(Envelope);