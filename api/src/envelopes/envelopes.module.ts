import { Module } from '@nestjs/common';
import { EnvelopesService } from './envelopes.service';
import { EnvelopesController } from './envelopes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { EnvelopeSchema } from 'src/schemas/envelope.schema';
import { RepositoriosModule } from 'src/repositorios/repositorios.module';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Envelope', schema: EnvelopeSchema}]),
    RepositoriosModule
  ],
  controllers: [EnvelopesController],
  providers: [EnvelopesService],
})
export class EnvelopesModule {}
