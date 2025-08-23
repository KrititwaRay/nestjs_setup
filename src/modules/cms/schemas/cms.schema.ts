import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";



export enum CmsStatus {
    Inactive = 'Inactive',
    Active = 'Active'
}
export enum CmsSlug {
  TERMS_AND_CONDITIONS = 'terms-and-conditions',
  PRIVACY_POLICY = 'privacy-policy',
}


export type CmsDocument = HydratedDocument<Cms>;


@Schema({ timestamps: true, versionKey: false })
export class Cms {
    @Prop({ type: String, default: '' })
    title: string;

    @Prop({ tuype: String, default: '' })
    description: string;

    @Prop({ type: String, default: '' })
    page: string;

    @Prop({ type: String, default: '', enum: CmsSlug })
    slug: string;

    @Prop({ type: String, default: CmsStatus.Active, enum: CmsStatus })
    status: string;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}


export const CmsSchema = SchemaFactory.createForClass(Cms);