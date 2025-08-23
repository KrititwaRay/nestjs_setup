import {
    FilterQuery,
    Model
} from 'mongoose';


export class BaseRepository<T> {
    private readonly model: Model<T>

    constructor(model: Model<T>){
        this.model = model;
    }

    async getAll (params: FilterQuery<T>): Promise<T[]>{
        return await this.model.find(params)
    }
}