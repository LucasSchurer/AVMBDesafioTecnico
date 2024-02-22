import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvelopesModule } from './envelopes/envelopes.module';
import { RepositoriosModule } from './repositorios/repositorios.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({    
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), 
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                uri: config.get('MONGO_DB_URI')
            })
        }),
        EnvelopesModule,
        RepositoriosModule,
        UsuariosModule
    ]
})

export class ApiModule {}