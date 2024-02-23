import { Controller, Get } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Usuario } from 'src/schemas/usuario.schema';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiOperation({summary: 'Recupera o ID do usuário atual'})
  @Get('id')
  async getId() {
    return await this.usuariosService.getId()
  }

  @ApiOkResponse({
    type: Usuario,
  })
  @ApiOperation({summary: 'Recupera o usuário atual'})
  @Get()
  async get(): Promise<Usuario> {
    return await this.usuariosService.get()
  }
}
