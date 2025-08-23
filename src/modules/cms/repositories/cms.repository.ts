import { Injectable } from "@nestjs/common";
import { Cms } from "../schemas/cms.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CmsRepository {
    constructor(
        
         @InjectModel(Cms.name) private readonly cmsModel: Model<Cms>, 
    ) {}


    async create(createCmsDto: Partial<Cms>): Promise<Cms> {
        const createdCms = new this.cmsModel(createCmsDto);
        return createdCms.save();
    }

    async getDetails(dto: any): Promise<any> {
        let findObj: {
            slug: string
            page: string
        } = {
            slug: dto.slug,
            page: ''
        }
        if(dto.page != '') {
            findObj.page = dto.page
        }

        const data = await this.cmsModel.findOne(findObj)

        return data;
    }

    
}