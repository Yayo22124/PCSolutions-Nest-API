import { Cita, CitaSchema } from './models/cita.model';

import { CitasController } from './controllers/citas/citas.controller';
import { CitasDaoService } from './services/citas.dao/citas.dao.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{name: Cita.name,schema: CitaSchema}])],
    controllers: [CitasController],
    providers: [CitasDaoService]
})
export class CitasModule {}
