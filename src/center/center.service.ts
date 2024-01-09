import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Observable, from } from "rxjs";
import { Center } from "./center.model";
import { Model } from "mongoose";
import { CreateCenterDto } from "./dto/CreateCenterDto";
import { UpdateCenterDto } from "./dto/UpdateCenterDto";
import { User } from "src/user/user.model";


@Injectable()
export class CenterService {
    constructor(@InjectModel('centers') private centerModel: Model<Center>,@InjectModel('users') private userModel: Model<User>) { }

    findAll(keyword?: string, skip = 0, limit = 10): Observable<Center[]> {
        if (keyword) {
            return from(
                this.centerModel
                    .find({ title: { $regex: '.*' + keyword + '.*' } })
                    .skip(skip)
                    .limit(limit)
                    .exec(),
            );
        } else {
            return from(
                this.centerModel
                    .find({})
                    .skip(skip)
                    .limit(limit)
                    .exec(),
            );
        }
    }

    findById(id: string): Observable<Center> {
        return from(this.centerModel.findOne({ _id: id }).exec());
    }

    save(data: CreateCenterDto): Observable<Center> {
        const createcenter = this.centerModel.create({ ...data });
        return from(createcenter);
    }

    update(id: number, data: UpdateCenterDto): Observable<Center> {
        return from(this.centerModel.findOneAndUpdate({ _id: id }, data).exec());
    }

    deleteById(id: string): Observable<Center> {
        return from(this.centerModel.findOneAndDelete({ _id: id }).exec());
    }

    deleteAll(): Observable<any> {
        return from(this.centerModel.deleteMany({}).exec());
    }
}