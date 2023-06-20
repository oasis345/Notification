import { Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { DataService } from './data.service';
import { DataOptions } from '@common/data/data.interface';
import { Request } from 'express';

@Controller('api/data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get(':table')
  get(@Req() request: Request<DataOptions>) {
    const options = request.params;

    return this.dataService.get(options);
  }

  @Post(':table')
  async save(@Req() request: Request<DataOptions>) {
    const options = request.params;
    options.data = request.body;

    await this.dataService.save(options);
  }

  @Delete(':table/:dataId')
  async remove(@Req() request: Request<DataOptions>) {
    const options = request.params;
    options.data = request.body;

    await this.dataService.remove(options);
  }
}
