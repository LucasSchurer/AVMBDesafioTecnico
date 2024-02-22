import { HttpService } from '@nestjs/axios';
import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { Repositorio } from 'src/schemas/repositorio.schema';
import { UsuarioId } from 'src/schemas/usuario.schema';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class RepositoriosService {
    constructor(private readonly httpService: HttpService, 
                private readonly configService: ConfigService,
                private readonly usuariosService: UsuariosService,
                ) {}

    async getAll(): Promise<Repositorio[]> {
        const idUsuario = await this.usuariosService.getId()

        const request_data = {
            token: this.configService.get('ASTEN_API_TOKEN'),
            params: {
                idProprietario: idUsuario
            }
        }

        const request = this.httpService
                        .post(this.configService.get('ASTEN_API_URL') + 'getRepositoriosDoUsuario', request_data)
                        .pipe(
                            map((res) => res.data.response)
                        )

        const data = await lastValueFrom<Repositorio[]>(request)

        return data
    }

    async get(id: Number): Promise<Repositorio> {
        const request_data = {
            token: this.configService.get('ASTEN_API_TOKEN'),
            params: {
                idRepositorio: id
            }
        }

        const request = this.httpService
                        .post(this.configService.get('ASTEN_API_URL') + 'getDadosRepositorio', request_data)
                        .pipe(
                            map((res) => res.data.response),
                            
                        )

        const data = await lastValueFrom<Repositorio>(request)

        return data
    }

    async create(repositorio: Repositorio) {
        if (!repositorio.Usuario) {
            repositorio.Usuario = new UsuarioId(await this.usuariosService.getId())            
        }

        const request_data = {
            token: this.configService.get('ASTEN_API_TOKEN'),
            params: {
                Repositorio: repositorio    
            }
        }

        const request = this.httpService
                        .post(this.configService.get('ASTEN_API_URL') + 'inserirRepositorio', request_data)
                        .pipe(
                            map((res) => res.data.response)
                        )

        return await lastValueFrom(request)
    }

    async delete(id: Number) {
        const request_data = {
            token: this.configService.get('ASTEN_API_TOKEN'),
            params: {
                idRepositorio: id
            }
        }

        const request = this.httpService
                        .post(this.configService.get('ASTEN_API_URL') + 'excluirRepositorio', request_data)
                        .pipe(
                            map((res) => res.data.response)
                        )
                        .pipe(
                            catchError((error: AxiosError) => {
                                throw new HttpException(error.response.data, error.response.status)
                            })
                        )

        return await lastValueFrom(request)
    }

    async deleteAll() {
        const repositorios = await this.getAll()

        const errors = []

        for (const i in repositorios) {
            try {
                const response = await this.delete(repositorios[i].id)   
            } catch (error) {
                errors.push( {repositorioId: repositorios[i].id, error: error })
                continue
            }
        }

        return errors
    }

    async update(id: Number, repositorio: Repositorio) {
        repositorio.id = id

        if (!repositorio.Usuario) {
            repositorio.Usuario = new UsuarioId(await this.usuariosService.getId())
        }

        const request_data = {
            token: this.configService.get('ASTEN_API_TOKEN'),
            params: {
                Repositorio: repositorio
            }
        }

        const request = this.httpService
                        .post(this.configService.get('ASTEN_API_URL') + 'atualizarRepositorio', request_data)
                        .pipe(
                            map((res) => res.data.response)
                        )

        return await lastValueFrom(request)
    }

    async getFirstOrCreate() : Promise<Repositorio> {
        const repositorios = await this.getAll()
        var repositorio = null

        if (repositorios.length > 0) {
            const newRepositorio = new Repositorio()

            newRepositorio.nome = 'Meus Envelopes'

            const response = await this.create(newRepositorio)

            newRepositorio.id = response.data.idRepositorio

            repositorio = newRepositorio
        } else
        {
            repositorio = repositorios[0]
        }

        return repositorio
    }
}
