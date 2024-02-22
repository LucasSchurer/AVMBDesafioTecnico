import { Prop, Schema } from "@nestjs/mongoose";

export class UsuarioId {
    constructor(id: Number) {
        this.id = id
    }

    @Prop({required: true})
    id: Number
}

@Schema()
export class Usuario {
    @Prop({required: true})
    id: Number

    @Prop({required: true})
    codigo: String

    @Prop({required: true})
    nome: String
    
    @Prop({required: true})    
    iniciais: String

    @Prop({required: true})
    email: String

    @Prop({required: true})
    ativo: String

    @Prop({required: true})
    contaVerificada: String

    @Prop({required: true})
    celular: String

    @Prop()
    empresa: String

    @Prop()
    cargo: String

    @Prop()
    imgAssinatura: String

    @Prop()
    imgAssinaturaExt: String

    @Prop()
    imgRubrica: String

    @Prop()
    imgRubricaExt: String

    @Prop()
    cpf: String

    @Prop()
    perfilUsuario: Number

    @Prop()
    receberLinkAssinatura: String

    @Prop()
    receberNotifConclusao: String

    @Prop()
    receberNotifPendente: String

    @Prop()
    receberNoticias: String

    @Prop()
    utilizaAutenticacao2FA: String

    @Prop()
    imgAutenticacao2FA: String

    @Prop()
    imgFoto: String

    @Prop()
    exibeAvisoEnvelope: String

    @Prop()
    acessoAPI: String

    @Prop()
    tokenAPI: String

    @Prop()
    urlCallback: String

    @Prop()
    ignorarPlanoAssin: String

    @Prop()
    googleAccId: String

    @Prop()
    azureAccId: String

    @Prop()
    ldapAccountName: String

    @Prop()
    dataHoraCadastro: Date

    @Prop()
    saldoDisponivelWorkflow: Number

    @Prop()
    limiteCards: String

    @Prop()
    PlanoContratado: String

    @Prop()
    limiteEnvelopes: String
}