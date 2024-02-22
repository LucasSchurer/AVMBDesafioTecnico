import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { Usuario } from 'src/schemas/usuario.schema';

@Injectable()
export class UsuariosService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

    async getId() {
        const request_data = {
            token: this.configService.get('ASTEN_API_TOKEN'),
            params: {
            }
        }

        const request = this.httpService
                        .post(this.configService.get('ASTEN_API_URL') + 'getIdentificador', request_data)
                        .pipe(
                            map((res) => res.data.response.Usuario.id)
                        )

        const data = await lastValueFrom(request)

        return data
    }

    async get() : Promise<Usuario> {
        const request_data = {
            token: this.configService.get('ASTEN_API_TOKEN'),
            params: {
                idUsuario: await this.getId()
            }
        }

        const request = this.httpService
                        .post(this.configService.get<Usuario>('ASTEN_API_URL') + 'getDadosUsuario', request_data)
                        .pipe(
                            map((res) => res.data.response)
                        )


        return await lastValueFrom<Usuario>(request)
    }
}
