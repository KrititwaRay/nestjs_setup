import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";



export enum CmsStatus {
    Inactive = 'Inactive',
    Active = 'Active'
}

@Schema({ timestamps: true, versionKey: false })
export class Cms {
    @Prop({ type: String, default: '' })
    title: string;

    @Prop({ tuype: String, default: '' })
    description: string;

    @Prop({ type: String, default: '' })
    page: string;

    @Prop({ type: String, default: '' })
    slug: string;

    @Prop({ type: String, default: CmsStatus.Active, enum: CmsStatus })
    status: string;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}


export const CmsSchema = SchemaFactory.createForClass(Cms);