import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Observable, from } from "rxjs";
import { Book } from "./book.model";
import { Model } from "mongoose";
import { CreateBookDto } from "./dto/create-detail.dto";
import { UpdateBookDto } from "./dto/update-detail.dto";


@Injectable()
export class BookService {
    constructor(@InjectModel('books') private bookModel: Model<Book>) { }

    findAll(keyword?: string, skip = 0, limit = 10): Observable<Book[]> {
        if (keyword) {
            return from(
                this.bookModel
                    .find({ title: { $regex: '.*' + keyword + '.*' } })
                    .skip(skip)
                    .limit(limit)
                    .exec(),
            );
        } else {
            return from(
                this.bookModel
                    .find({})
                    .skip(skip)
                    .limit(limit)
                    .exec(),
            );
        }
    }

    findById(id: string): Observable<Book> {
        return from(this.bookModel.findOne({ _id: id }).exec());
    }

    save(data: CreateBookDto): Observable<Book> {
        const createbook = this.bookModel.create({ ...data });
        return from(createbook);
    }

    update(id: number, data: UpdateBookDto): Observable<Book> {
        return from(this.bookModel.findOneAndUpdate({ _id: id }, data).exec());
    }

    deleteById(id: string): Observable<Book> {
        return from(this.bookModel.findOneAndDelete({ _id: id }).exec());
    }

    deleteAll(): Observable<any> {
        return from(this.bookModel.deleteMany({}).exec());
    }
}