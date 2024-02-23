import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

import { CitasDaoService } from '../../services/citas.dao/citas.dao.service';
import { iCita } from '../../../../core/interfaces/cita/cita.interface';
import { Response } from 'express';

@Controller('citas')
export class CitasController {
    constructor(
        private readonly citaService: CitasDaoService
    ) {}

    // GetAll
    @Get()
    async getAllCitas(): Promise<iCita[]> {
        try {
            const citas: iCita[] = await this.citaService.getAll();
            return citas;
        } catch(err) {
            console.log(err);
            throw err;
            
        }
    }

    // Get One Cita
    @Get(':id')
    async getOneCita(@Param('id') id: number, @Res() res: Response) {
        this.citaService.getOne(id)
        .then(result => {
            if (result) {
                return res.json(result);
            } else {
                return res.json({
                    msg: `Cita not found.`
                });
            }
        });
    }

    // Insert Cita
    @Post()
    async insertCita(@Body() newCita: iCita) {
        return this.citaService.create(newCita);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateCita(@Param('id') foilParam: string, @Body() updatedCita: iCita, @Res() res: Response) {
        const id = parseInt(foilParam, 10);

        if (isNaN(id)) {
            // Si 'id' no es un número válido, devuelve un error
            return res.json({
              msg: 'El parámetro "id" debe ser un número válido.',
            });
          }

        this.citaService.updateOne(id, updatedCita)
        .then(result => {
            if (result) {
                res.json({
                    msg: `Cita with id: ${id}, was succesfully updated.`
                })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    msg: `Cita with id: ${id}, not found.`,
                  });
            }
        })
        .catch(err => {
            console.error(err);
      res.json({
        msg: 'Error updating Cita.',
      });
        })
    }
}
