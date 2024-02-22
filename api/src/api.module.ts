import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvelopesModule } from './envelopes/envelopes.module';
import { RepositoriosModule } from './repositorios/repositorios.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({    
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), 
        MongooseModule.forRoot(''),
        EnvelopesModule,
        RepositoriosModule,
        UsuariosModule
    ]
})

export class ApiModule {}