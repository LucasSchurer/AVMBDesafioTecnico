import { Prop, Schema } from "@nestjs/mongoose";
import { Usuario, UsuarioId } from "./usuario.schema";

export class RepositorioId {
    constructor(id: Number) {
        this.id = id
    }
    
    @Prop({required: true})
    id: Number
}

@Schema()
export class Repositorio {
    @Prop({required: true})
    id: Number

    @Prop({required: true})
    Usuario: UsuarioId

    @Prop({required: true})
    nome: String

    @Prop()
    compartilharCriacaoDocs: String

    @Prop()
    compartilharVisualizacaoDocs: String

    @Prop()
    ocultarEmailSignatarios: String

    @Prop()
    nomeRemetente: String

    @Prop()
    opcaoValidCodigo: String

    @Prop()
    opcaoValidCertICP: String

    @Prop()
    opcaoValidDocFoto: String

    @Prop()
    opcaoValidDocSelfie: String

    @Prop()
    opcaoValidTokenSMS: String

    @Prop()
    opcaoValidLogin: String

    @Prop()
    opcaoValidReconhecFacial: String

    @Prop()
    opcaoValidPix: String

    @Prop()
    lembrarAssinPendentes: String

    @Prop()
    dataHoraCriacao: String

    @Prop()
    isProprietario: String
}