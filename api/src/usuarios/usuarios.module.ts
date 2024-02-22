import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})

export class UsuariosModule {}
