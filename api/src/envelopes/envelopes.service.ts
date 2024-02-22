import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { Documento, Envelope } from 'src/schemas/envelope.schema';
import { RepositorioId } from 'src/schemas/repositorio.schema';
import { RepositoriosService } from 'src/repositorios/repositorios.service';

@Injectable()
export class EnvelopesService {
  constructor(
      @InjectModel(Envelope.name) private readonly envelopeModel: Model<Envelope>, 
      private readonly configService: ConfigService,
      private readonly httpService: HttpService,
      private readonly repositoriosService: RepositoriosService
      ) {}
  
  async getAll(idRepositorio: Number): Promise<Envelope[]> {
    const request_data = {
      token: this.configService.get('ASTEN_API_TOKEN'),
      params: {
      }
    }

    if (idRepositorio) {
      request_data.params = { idRepositorio: idRepositorio }
    }

    const request = this.httpService
                    .post(this.configService.get('ASTEN_API_URL') + 'getEnvelopesByRepositorioOuPasta', request_data)
                    .pipe(
                      map((res) => res.data.response)
                    )
                    .pipe(
                      catchError((error: AxiosError) => {
                        throw new HttpException(error.response.data, error.response.status)
                      })
                    )

    return await lastValueFrom<Envelope[]>(request)
  }

  async get(id: Number): Promise<Envelope> {
    const request_data = {
      token: this.configService.get('ASTEN_API_TOKEN'),
      params: {
        idEnvelope: id
      }
    }

    const request = this.httpService
                    .post(this.configService.get('ASTEN_API_URL') + 'getDadosEnvelope', request_data)
                    .pipe(
                      map((res) => res.data.response)
                    )
                    .pipe(
                      catchError((error: AxiosError) => {
                        throw new HttpException(error.response.data, error.response.status)
                      })
                    )

    return await lastValueFrom<Envelope>(request)
  }

  async create(envelope: Envelope) {
    if (!envelope.Repositorio) {
      const id = (await this.repositoriosService.getFirstOrCreate()).id
      envelope.Repositorio = new RepositorioId(id)
    }

    const request_data = {
      token: this.configService.get('ASTEN_API_TOKEN'),
      params: {
        Envelope: envelope
      }
    }

    const request = this.httpService
                    .post(this.configService.get('ASTEN_API_URL') + 'inserirEnvelope', request_data)
                    .pipe(
                      map((res) => res.data.response)
                    )
                    .pipe(
                      catchError((error: AxiosError) => {
                        throw new HttpException(error.response.data, error.response.status)
                      })
                    )

      const response = await lastValueFrom(request)

      await this.createDB(response.data.idEnvelope)

      return response
  }

  async createDB(id: Number) {
    const apiEnvelope = await this.get(id)

    const dbEnvelope = new this.envelopeModel(apiEnvelope)
    return await dbEnvelope.save()
  }

  async delete(id: Number) {
    const request_data = {
      token: this.configService.get('ASTEN_API_TOKEN'),
      params: {
        idEnvelope: id
      }
    }

    const request = this.httpService
                    .post(this.configService.get('ASTEN_API_URL') + 'expurgarEnvelope', request_data)
                    .pipe(
                      map((res) => res.data.response)
                    )
                    .pipe(
                      catchError((error: AxiosError) => {
                        throw new HttpException(error.response.data, error.response.status)
                      })
                    )


    await this.deleteDB(id)

    return await lastValueFrom(request)
  }

  async deleteAll(idRepositorio: Number) {
    const envelopes = await this.getAll(idRepositorio)

    const errors = []

    for (const i in envelopes) {
        try {
            const response = await this.delete(envelopes[i].id)
        } catch (error) {
            errors.push( {repositorioId: envelopes[i].id, error: error })
            continue
        }
    }

    return errors
  }

  async deleteDB(id: Number) {
    return await this.envelopeModel.findOneAndDelete({id: id}).exec()
  }

  async updateDB(id: Number) {
    const apiEnvelope = await this.get(id)

    return await this.envelopeModel.findOneAndUpdate({id: id}, apiEnvelope).exec()
  }

  async createDocumento(documento: Documento) {
    const request_data = {
      token: this.configService.get('ASTEN_API_TOKEN'),
      params: {
        Documento: documento
      }
    }

    const request = this.httpService
                    .post(this.configService.get('ASTEN_API_URL') + 'inserirDocumento', request_data)
                    .pipe(
                      map((res) => res.data.response)
                    )
                    .pipe(
                      catchError((error: AxiosError) => {
                        throw new HttpException(error.response.data, error.response.status)
                      })
                    )

      const response = await lastValueFrom(request)

      await this.updateDB(documento.Envelope.id)

      return response
  }

  async cancelEnvelope(data: any) {
    const request_data = {
      token: this.configService.get('ASTEN_API_TOKEN'),
      params: {
        idEnvelope: data.idEnvelope,
        motivo: data.motivo,
        anularAssinaturas: data.anularAssinaturas ?? 'S'
      }
    }

    const request = this.httpService
                    .post(this.configService.get('ASTEN_API_URL') + 'cancelarEnvelope', request_data)
                    .pipe(
                      map((res) => res.data.response)
                    )
                    .pipe(
                      catchError((error: AxiosError) => {
                        throw new HttpException(error.response.data, error.response.status)
                      })
                    )

      const response = await lastValueFrom(request)

      await this.updateDB(data.idEnvelope)

      return response
  }

  async finishEnvelope(id: Number) {
    const request_data = {
      token: this.configService.get('ASTEN_API_TOKEN'),
      params: {
        idEnvelope: id
      }
    }

    const request = this.httpService
                    .post(this.configService.get('ASTEN_API_URL') + 'concluirEnvelope', request_data)
                    .pipe(
                      map((res) => res.data.response)
                    )
                    .pipe(
                      catchError((error: AxiosError) => {
                        throw new HttpException(error.response.data, error.response.status)
                      })
                    )

      const response = await lastValueFrom(request)

      await this.updateDB(id)

      return response
  }

  async archiveEnvelope(id: Number) {
    const request_data = {
      token: this.configService.get('ASTEN_API_TOKEN'),
      params: {
        idEnvelope: id
      }
    }

    const request = this.httpService
                    .post(this.configService.get('ASTEN_API_URL') + 'arquivarEnvelope', request_data)
                    .pipe(
                      map((res) => res.data.response)
                    )
                    .pipe(
                      catchError((error: AxiosError) => {
                        throw new HttpException(error.response.data, error.response.status)
                      })
                    )

      const response = await lastValueFrom(request)

      await this.updateDB(id)

      return response
  }

  async unarchiveEnvelope(id: Number) {
    const request_data = {
      token: this.configService.get('ASTEN_API_TOKEN'),
      params: {
        idEnvelope: id
      }
    }

    const request = this.httpService
                    .post(this.configService.get('ASTEN_API_URL') + 'desarquivarEnvelope', request_data)
                    .pipe(
                      map((res) => res.data.response)
                    )
                    .pipe(
                      catchError((error: AxiosError) => {
                        throw new HttpException(error.response.data, error.response.status)
                      })
                    )

      const response = await lastValueFrom(request)

      await this.updateDB(id)

      return response
  }
}
