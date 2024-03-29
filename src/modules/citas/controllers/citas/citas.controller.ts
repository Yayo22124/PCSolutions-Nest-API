import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

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
    async getOneCita(@Param('id') id: string, @Res() res: Response) {
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

    @Delete(':id')
    async deleteCita(@Param('id') id: string, @Res() res: Response) {
        this.citaService.deleteOne(id)
        .then(result => {
            if (result) {
                res.json({
                    msg: `Cita with id: ${id}, was succesfully deleted.`
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

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateCita(@Param('id') id: string, @Body() updatedCita: iCita, @Res() res: Response) {

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
