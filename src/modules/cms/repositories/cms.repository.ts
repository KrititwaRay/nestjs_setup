import { Injectable } from "@nestjs/common";
import { Cms } from "../schemas/cms.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CmsRepository {
    constructor(
        
         @InjectModel(Cms.name) private readonly cmsModel: Model<Cms>, 
    ) { 
        console.log("*******Cms.name********", Cms)
    }


    async create(createCmsDto: Partial<Cms>): Promise<Cms> {
        const createdCms = new this.cmsModel(createCmsDto);
        return createdCms.save();
    }

    
}