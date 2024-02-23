import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cita, CitaDocument } from '../../models/cita.model';
import { Model } from 'mongoose';
import { iCita } from '../../../../core/interfaces/cita/cita.interface';

@Injectable()
export class CitasDaoService {
    constructor(
        @InjectModel(Cita.name) private readonly citaModel: Model<CitaDocument>
    ) {}

    // GetAll
    async getAll(): Promise<iCita[]> {
        return this.citaModel.find({}).exec();
    }

    // GetOne
    async getOne(id: string): Promise<iCita | null> {
        const cita = await this.citaModel.findOne({ id }).exec();
        return cita ?? null;
    }


    // insertOne
    async create(newCita: iCita): Promise<iCita> {
        const createdTicket = new this.citaModel(newCita);
        return createdTicket.save();
    }

    // updateOne
    async updateOne(id: string, updatedCita: iCita) {
        const updatedTicket = this.citaModel.findOneAndUpdate({id}, updatedCita);
        return updatedTicket;
    }

    // deleteOne
    async deleteOne(id: string) {
        const deletedTicket = this.citaModel.findOneAndDelete({id});
        return deletedTicket;
    }
}
