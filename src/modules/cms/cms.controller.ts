import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CmsService } from "./cms.service";

@Controller('cms')
export class CmsController {

    constructor(private readonly cmsService: CmsService) {
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