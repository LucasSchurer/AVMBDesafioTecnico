import { Module } from '@nestjs/common';
import { RepositoriosService } from './repositorios.service';
import { RepositoriosController } from './repositorios.controller';
import { HttpModule } from '@nestjs/axios';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [HttpModule, UsuariosModule],
  controllers: [RepositoriosController],
  providers: [RepositoriosService],
  exports: [RepositoriosService]
})
export class RepositoriosModule {}
