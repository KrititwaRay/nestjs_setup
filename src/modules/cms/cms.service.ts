import { Injectable } from "@nestjs/common";
import { CmsRepository } from "./repositories/cms.repository";


@Injectable()
export class CmsService {

    constructor(private readonly cmsRepository: CmsRepository) { }

    async getAll(){
        const data = await this.cmsRepository.getAll({})
        return data;
    }

    async create(dto: any): Promise<any>{
        console.log(dto);
        return this.cmsRepository.create(dto);

    }

    async getDetails(dto: any): Promise<any>{

        console.log("dto ", dto);
       
        let data = await this.cmsRepository.getDetails(dto)
        return data;

    }
}