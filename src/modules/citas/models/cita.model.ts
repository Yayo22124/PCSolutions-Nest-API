import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from "mongoose";

export type CitaDocument = HydratedDocument<Cita>;

@Schema()
export class Cita {
        @Prop({
            unique: true,
            required: true
        })
        id: String
        
        @Prop()
        name: String
        
        @Prop()
        email: String

        @Prop()
        title: String

        @Prop()
        message: String

        @Prop()
        date: String

        @Prop()
        status: boolean
}
export const CitaSchema = SchemaFactory.createForClass(Cita);