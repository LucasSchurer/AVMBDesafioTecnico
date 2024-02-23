import { Prop, Schema } from "@nestjs/mongoose";
import { UsuarioId } from "./usuario.schema";
import { ApiHideProperty, ApiOperation, ApiProperty } from "@nestjs/swagger";

export class RepositorioId {
    constructor(id: Number) {
        this.id = id
    }
    
    @Prop({required: true})
    id: Number
}

@Schema()
export class Repositorio {
    @ApiProperty({description: 'ID do repositório'})
    @Prop({required: true})
    id: Number

    @ApiProperty({description: 'ID do usuário dono do repositório',  example: {Usuario: {id: 0}}})
    @Prop({required: true})
    Usuario: UsuarioId

    @ApiProperty({description: 'Nome do repositório', example: 'Meus Envelopes'})
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