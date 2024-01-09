import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Observable, catchError, first, map, of, take, toArray } from "rxjs";
import { Book } from "./book.model";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-detail.dto";
import { UpdateBookDto } from "./dto/update-detail.dto";



@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('')
  getAllBooks(@Query('q') keyword?: string): Observable<(Book | Book[])[]>{
    return this.bookService.findAll(keyword).pipe(take(10), toArray());
  }

  @Get(':id')
  getBookById(@Param('id') id: string): Observable<Book> {
    const bookObservable = this.bookService.findById(id).pipe(
      map((foundBook) => {
        if (!foundBook) {
          throw new NotFoundException(`Book with id ${id} not found`);
        }
        return foundBook;
      })
    );
  
    return bookObservable;
  }

  @Post('')
  @UsePipes(new ValidationPipe({ transform: true }))
  createBook(@Body() book: CreateBookDto):Observable<Book[]> {
    return this.bookService.save(book).pipe(toArray());
  }

  @Put(':id')
  updateBook(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateBookDto): Observable<Book[]> {
    return this.bookService.update(id, book).pipe(toArray());
  }

  @Delete(':id')
  deleteBookById(@Param('id') id: string): Observable<Book> {
    const bookObservable = this.bookService.deleteById(id).pipe(
      map((foundBook) => {
        if (!foundBook) {
          throw new NotFoundException(`Book with id ${id} not found`);
        }
        return foundBook;
      })
    );
  
    return bookObservable;
  }
}