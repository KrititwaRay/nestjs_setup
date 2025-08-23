import { Body, Controller, Get, Post, Query, HttpCode } from "@nestjs/common";
import { CmsService } from "./cms.service";

@Controller('cms')
export class CmsController {

    constructor(private readonly cmsService: CmsService) {
    }
    
    @Get('getall')
    @HttpCode(200)
    async getAllCms(){
        return this.cmsService.getAll()

    }

    @Post('save')
    async create(@Body() dto: any): Promise<any> {
        return this.cmsService.create(dto);
    }


    @Get('details')
    async details(@Query() query: any){
        return this.cmsService.getDetails(query)

    }

    
    
}