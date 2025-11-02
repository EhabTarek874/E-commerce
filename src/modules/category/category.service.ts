import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetAllDto, UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument, CategoryRepository, UserDocument } from 'src/DB';
import { FolderEnum, S3service } from 'src/common';
import { Types } from 'mongoose';
import { BrandRepository } from './../../DB/repository/brand.repository';
import { randomUUID } from 'crypto';
import { Lean } from 'src/DB/repository/database.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository, private readonly s3service: S3service, private readonly brandRepository: BrandRepository) { }

  async create(createCategoryDto: CreateCategoryDto, file: Express.Multer.File, user: UserDocument): Promise<CategoryDocument> {
    const { name } = createCategoryDto;
    const checkDuplicated = await this.categoryRepository.findOne({ filter: { name, paranoId: false } });

    if (checkDuplicated) {
      throw new ConflictException(checkDuplicated.freezedAt ? "Duplicated with archived Category" : "Duplicated Category name")
    }
    let assetFolderId: string = randomUUID();
    const image: string = await this.s3service.uploadFile({ file, path: `${FolderEnum.Category}/${assetFolderId}` });

    const brands: Types.ObjectId[] = [...new Set(createCategoryDto.brands || [])]
    if (
      brands && (await this.brandRepository.find({ filter: { _id: { $in: brands } } })).length != brands.length
    ) {
      throw new NotFoundException("some of mentioned brands are not exists")
    }
    const [Category] = await this.categoryRepository.create({ data: [{ ...createCategoryDto, image, assetFolderId, createdBy: user._id, brands: brands.map(brand => { return Types.ObjectId.createFromHexString(brand as unknown as string) }) }] });

    if (!Category) {
      await this.s3service.deleteFile({ Key: image });
      throw new BadRequestException("Fail to create this Category")
    }
    return Category;
  }



  async update(categoryId: Types.ObjectId, updateCategoryDto: UpdateCategoryDto, user: UserDocument): Promise<CategoryDocument | Lean<CategoryDocument>> {


    const brands: Types.ObjectId[] = [...new Set(updateCategoryDto.brands || [])]
    if (
      brands && (await this.brandRepository.find({ filter: { _id: { $in: brands } } })).length != brands.length
    ) {
      throw new NotFoundException("some of mentioned brands are not exists")
    }

    if (updateCategoryDto.name && await this.categoryRepository.findOne({ filter: { name: updateCategoryDto.name } })) {
      throw new ConflictException("Duplicated Category name")
    }


    const removeBrands = updateCategoryDto.brands ?? [];
    // delete updateCategoryDto.removeBrands;

    const category = await this.categoryRepository.findOneAndUpdate({
      filter: { _id: categoryId },
      update: [
        {
          $set: {
            ...updateCategoryDto,
            updatedBy: user._id,
            brands:{
              $setUnion:[
                {
                  $setDifference:[
                    "$brands",
                    (removeBrands || []).map((brand) =>{
                      return Types.ObjectId.createFromHexString(brand as unknown as string)
                    })
                  ]
                },
                
                  brands.map((brand) => {
                    return Types.ObjectId.createFromHexString(brand as unknown as string)
                  })
                
              ]
            }
          },
        },
      ],
    })

    if (!category) {
      throw new BadRequestException("Fail to find matching Category")
    }

    return category;
  }



  async updateAttachment(categoryId: Types.ObjectId, file: Express.Multer.File, user: UserDocument): Promise<CategoryDocument | Lean<CategoryDocument>> {


    const category = await this.categoryRepository.findOne({
      filter: { _id: categoryId },
      
    })

    if (!category) {
      throw new BadRequestException("Fail to find matching Category")
    }

    const image = await this.s3service.uploadFile({ file, path:` ${FolderEnum.Category}/${category.assetFolderId} `});

    const UpdateCategory = await this.categoryRepository.findOneAndUpdate({
      filter: { _id: categoryId },
      update:{
        image,
        updatedBy:user._id
      },
    })
    if (!UpdateCategory) {
      await this.s3service.deleteFile({Key:image})
      throw new NotFoundException("Fail to matching Category ")
    }

    await this.s3service.deleteFile({ Key: category.image });
    return UpdateCategory;
  }


  async freeze(categoryId: Types.ObjectId, user: UserDocument): Promise<string> {

    const category = await this.categoryRepository.findOneAndUpdate({
      filter: { _id: categoryId },
      update: {
        freezedAt: new Date(),
        $unset: { restoredAt: true },
        updatedBy: user._id
      },
      options: {
        new: false
      }
    })

    if (!category) {
      throw new BadRequestException("Fail to find matching Category")
    }
    return "Done";
  }


  async restore(categoryId: Types.ObjectId, user: UserDocument): Promise<string> {

    const category = await this.categoryRepository.findOneAndUpdate({
      filter: { _id: categoryId, paranoId: false, freezedAt: { $exists: true } },
      update: {
        restoredAt: new Date(),
        $unset: { freezedAt: true },
        updatedBy: user._id
      },
      options: {
        new: false
      }
    })

    if (!category) {
      throw new BadRequestException("Fail to find matching Category")
    }
    return "Done";
  }


  async remove(categoryId: Types.ObjectId, user: UserDocument): Promise<string> {

    const category = await this.categoryRepository.findOneAndDelete({
      filter: { _id: categoryId, paranoId: false, freezedAt: { $exists: true } },

    })

    if (!category) {
      throw new BadRequestException("Fail to find matching Category")
    }

    await this.s3service.deleteFile({ Key: category.image })
    return "Done";
  }

  async findAll(data: GetAllDto, archive: boolean = false) {
    const { page, size, search } = data;
    const result = await this.categoryRepository.paginate({
      filter: {
        ...(search ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { slug: { $regex: search, $options: "i" } },
            { discretion: { $regex: search, $options: "i" } },
          ]
        } : {}),
        ...(archive ? { paranoId: false, freezedAt: { $exists: true } } : {})
      },
      page, size
    })
    return result;
  }


  async findOne(categoryId: Types.ObjectId, archive: boolean = false): Promise<CategoryDocument | Lean<CategoryDocument>> {
    const category = await this.categoryRepository.findOne({
      filter: {
        _id: categoryId,
        ...(archive ? { paranoId: false, freezedAt: { $exists: true } } : {})
      },

    });
    if (!category) {
      throw new NotFoundException("Fail to finds matching Category instance")
    }
    return category;
  }

}
