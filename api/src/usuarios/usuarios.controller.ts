import { Controller, Get } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiOperation({summary: 'Recupera o ID do usuário atual'})
  @Get('id')
  async getId() {
    return await this.usuariosService.getId()
  }

  @Get()
  async get() {
    return await this.usuariosService.get()
  }
}
