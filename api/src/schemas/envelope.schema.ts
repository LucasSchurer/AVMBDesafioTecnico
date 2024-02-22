import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { RepositorioId } from './repositorio.schema';
import { UsuarioId } from './usuario.schema';


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
  @Prop({required: true})
  id: Number

  @Prop()
  Repositorio: RepositorioId

  @Prop()
  Usuario: UsuarioId

  @Prop()
  descricao: string

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