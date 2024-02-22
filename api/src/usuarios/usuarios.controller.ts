import { Controller, Get } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get('id')
  async getId() {
    return await this.usuariosService.getId()
  }

  @Get()
  async get() {
    return await this.usuariosService.get()
  }
}
