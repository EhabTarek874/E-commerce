import { ProjectionType, QueryOptions, FlattenMaps, Model, RootFilterQuery, Types, CreateOptions, UpdateQuery, MongooseUpdateQueryOptions, UpdateWriteOpResult, DeleteResult, HydratedDocument } from "mongoose";
export type Lean<T> = FlattenMaps<T>;
export declare abstract class DatabaseRepository<TRawDocument, TDocument = HydratedDocument<TRawDocument>> {
    protected model: Model<TDocument>;
    constructor(model: Model<TDocument>);
    findOne({ filter, select, options, }: {
        filter?: RootFilterQuery<TRawDocument>;
        select?: ProjectionType<TRawDocument> | null;
        options?: QueryOptions<TDocument> | null;
    }): Promise<TDocument | null | Lean<TDocument>>;
    find({ filter, select, options, }: {
        filter?: RootFilterQuery<TRawDocument>;
        select?: ProjectionType<TRawDocument> | undefined;
        options?: QueryOptions<TDocument> | undefined;
    }): Promise<Lean<TDocument[]> | TDocument[] | []>;
    paginate({ filter, select, options, page, size, }: {
        filter?: RootFilterQuery<TRawDocument>;
        select?: ProjectionType<TRawDocument> | undefined;
        options?: QueryOptions<TDocument> | undefined;
        page?: number | "all";
        size?: number;
    }): Promise<Lean<TDocument[]> | TDocument[] | any>;
    findById({ id, select, options, }: {
        id: Types.ObjectId;
        select?: ProjectionType<TDocument> | null;
        options?: QueryOptions<TDocument> | null;
    }): Promise<Lean<TDocument> | TDocument | null>;
    create({ data, options, }: {
        data: Partial<TRawDocument>[];
        options?: CreateOptions | undefined;
    }): Promise<TDocument[]>;
    insertMany({ data, }: {
        data: Partial<TDocument>[];
        options?: CreateOptions | undefined;
    }): Promise<TDocument[]>;
    updateOne({ filter, update, options, }: {
        filter: RootFilterQuery<TRawDocument>;
        update: UpdateQuery<TDocument>;
        options?: MongooseUpdateQueryOptions<TDocument> | null;
    }): Promise<UpdateWriteOpResult>;
    findByIdAndUpdate({ id, update, options, }: {
        id?: Types.ObjectId;
        update: UpdateQuery<TDocument>;
        options?: MongooseUpdateQueryOptions<TDocument> | null;
    }): Promise<TDocument | Lean<TDocument> | null>;
    findOneAndUpdate({ filter, update, options, }: {
        filter?: RootFilterQuery<TRawDocument>;
        update: UpdateQuery<TDocument>;
        options?: MongooseUpdateQueryOptions<TDocument> | null;
    }): Promise<TDocument | Lean<TDocument> | null>;
    deleteOne({ filter, }: {
        filter: RootFilterQuery<TRawDocument>;
    }): Promise<DeleteResult>;
    deleteMany({ filter, }: {
        filter: RootFilterQuery<TRawDocument>;
    }): Promise<DeleteResult>;
    findOneAndDelete({ filter, }: {
        filter: RootFilterQuery<TDocument>;
    }): Promise<TDocument | null>;
}
