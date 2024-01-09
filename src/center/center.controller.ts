import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Observable, catchError, first, map, of, take, toArray } from "rxjs";
import { Center } from "./center.model";
import { CenterService } from "./center.service";
import { CreateCenterDto } from "./dto/CreateCenterDto";
import { UpdateCenterDto } from "./dto/UpdateCenterDto";
import { CenterUserRelation } from "src/model/CenterUserRelation";
import { User } from "src/user/user.model";



@Controller('centers')
export class CenterController {
  constructor(private centerService: CenterService) {}



  @Get('test')
  test(): Observable<CenterUserRelation> {
    let firstUser: User;
    let firstCenter: Center;
  
    return from(User.findOne().exec()).pipe(
      tap((user) => (firstUser = user)),
      mergeMap(() => from(Center.findOne().exec())),
      tap((center) => (firstCenter = center)),
      mergeMap(() =>
        from(
          this.centerUserRelationModel.create({
            center: firstCenter._id,
            user: firstUser._id,
          }),
        ),
      ),
    );
  }

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