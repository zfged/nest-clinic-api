import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Observable, map, take, toArray } from "rxjs";
import { Center } from "./center.model";
import { CenterService } from "./center.service";
import { CreateCenterDto } from "./dto/CreateCenterDto";
import { UpdateCenterDto } from "./dto/UpdateCenterDto";




@Controller('centers')
export class CenterController {
  constructor(private centerService: CenterService) {}


  @Get('')
  getAllCenters(@Query('q') keyword?: string): Observable<(Center | Center[])[]>{
    return this.centerService.findAll(keyword).pipe(take(10), toArray());
  }

  @Get(':id')
  getCenterById(@Param('id') id: string): Observable<Center> {
    const centerObservable = this.centerService.findById(id).pipe(
      map((foundCenter) => {
        if (!foundCenter) {
          throw new NotFoundException(`Center with id ${id} not found`);
        }
        return foundCenter;
      })
    );
  
    return centerObservable;
  }

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true }))
  createCenter(@Body() center: CreateCenterDto):Observable<Center[]> {
    return this.centerService.save(center).pipe(toArray());
  }

  @Put(':id')
  updateCenter(@Param('id', ParseIntPipe) id: number, @Body() center: UpdateCenterDto): Observable<Center[]> {
    return this.centerService.update(id, center).pipe(toArray());
  }

  @Delete(':id')
  deleteCenterById(@Param('id') id: string): Observable<Center> {
    const centerObservable = this.centerService.deleteById(id).pipe(
      map((foundCenter) => {
        if (!foundCenter) {
          throw new NotFoundException(`Center with id ${id} not found`);
        }
        return foundCenter;
      })
    );
  
    return centerObservable;
  }
}