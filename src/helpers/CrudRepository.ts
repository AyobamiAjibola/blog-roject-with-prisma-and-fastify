import { appModelTypes } from '../@types/app-model';
import { PrismaClient, Prisma } from '../prisma/generated/client';

const prisma = new PrismaClient();

export class BlogRepository {
    private readonly prisma = prisma;
  
    async create(data: Prisma.BlogCreateInput): Promise<appModelTypes.IBlog> {
      return this.prisma.blog.create({ data });
    }

    async findById(id: number): Promise<appModelTypes.IBlog | null> {
        return this.prisma.blog.findUnique({ where: { id } });
    }

    async findAll(): Promise<appModelTypes.IBlog[]> {
        return this.prisma.blog.findMany();
    }

    async findPaginated(offset: number, limit: number): Promise<appModelTypes.IBlog[]> {
        return this.prisma.blog.findMany({
            skip: offset,
            take: limit,
        });
    }

    async findFirst(where: Prisma.BlogWhereInput): Promise<appModelTypes.IBlog | null> {
        return this.prisma.blog.findFirst({ where });
    }

    async updateById(id: number, data: Prisma.BlogUpdateInput): Promise<appModelTypes.IBlog | null> {
        await this.prisma.blog.update({ where: { id }, data });
        return this.findById(id);
    }

    async updateMany(where: Prisma.BlogWhereInput, data: Prisma.BlogUpdateInput): Promise<appModelTypes.IBlog[]> {
        await this.prisma.blog.updateMany({ where, data });
      
        const updatedRecords = await this.prisma.blog.findMany({ where });
      
        return updatedRecords;
    }

    async createMany(data: Prisma.BlogCreateManyInput[]): Promise<appModelTypes.IBlog[]> {
        const createdRecords: appModelTypes.IBlog[] = [];
      
        for (const item of data) {
          const createdRecord = await this.prisma.blog.create({ data: item });
          createdRecords.push(createdRecord);
        }
      
        return createdRecords;
    }
      

    async deleteById(id: number): Promise<appModelTypes.IBlog | null> {
        const user = await this.findById(id);
        if (user) {
        await this.prisma.blog.delete({ where: { id } });
        }
        return user;
    }

    async deleteMany(where: Prisma.BlogWhereInput): Promise<Prisma.BatchPayload> {
        return this.prisma.blog.deleteMany({ where });
    }
  
  }


//----- MORE GENERIC CRUDREPOSITORY STILL NEEDS WORK ---//
// type ModelName = 'Blog' //| 'Post'; // Add more model names as needed

// type ModelType<TModelName> = TModelName extends 'Blog'
//   ? import('../prisma/generated/client').Blog
//   : never
// //   ? import('../prisma/generated/client').User
// //   : TModelName extends 'Blog'
// //   ? import('../prisma/generated/client').Blog
// //   : never;

// export default class CrudRepository<TModelName extends ModelName, Id extends number> {
//     private readonly prisma = prisma;
//     private readonly modelName: TModelName;
  
//     constructor(modelName: TModelName) {
//       this.modelName = modelName;
//     }
  
//     async create(data: Partial<ModelType<TModelName>>): Promise<ModelType<TModelName>> {
//       const modelNameLower = this.modelName.toLowerCase() as keyof typeof prisma;
//       const prismaModel = this.prisma[modelNameLower] as any;

//       const createdItem = await prismaModel[modelNameLower].create({
//           data: data as any, 
//       });
  
//       return createdItem;
//     }

//     async findById(id: Id): Promise<ModelType<TModelName> | null> {
//         const modelNameLower = this.modelName.toLowerCase() as keyof typeof prisma;
//         const prismaModel = this.prisma[modelNameLower] as any;
    
//         const findUniqueItem = await prismaModel[modelNameLower].findUnique({ where: { id } });
    
//         return findUniqueItem;
//     }

//     async findAll(): Promise<ModelType<TModelName>[]> {
//         const modelNameLower = this.modelName.toLowerCase() as keyof typeof prisma;
//             const prismaModel = this.prisma[modelNameLower] as any;
        
//             const findManyItems = await prismaModel[modelNameLower].findMany();
        
//             return findManyItems;
//     }

//   async deleteById(id: Id): Promise<void> {
//     const modelNameLower = this.modelName.toLowerCase() as keyof typeof prisma;
//     const prismaModel = this.prisma[modelNameLower] as any;

//     await prismaModel[modelNameLower].delete({
//       where: { id },
//     });
//   }

//   async updateById(id: Id, data: Partial<ModelType<TModelName>>): Promise<ModelType<TModelName> | null> {
//     const modelNameLower = this.modelName.toLowerCase() as keyof typeof prisma;
//     const prismaModel = this.prisma[modelNameLower] as any;

//     const updatedItem = await prismaModel[modelNameLower].update({
//       where: { id },
//       data: data as any
//     });

//     return updatedItem;
//   }

//   async updateMany(
//         where: any, //Prisma.ModelNameUpdateManyArgs<ModelType<TModelName>>,
//         data: any //Prisma.ModelNameUpdateManyMutationInput<ModelType<TModelName>>
//     ): Promise<Prisma.BatchPayload> {
//     const modelNameLower = this.modelName.toLowerCase() as keyof typeof prisma;
//     const prismaModel = this.prisma[modelNameLower] as any;

//     const result = await prismaModel[modelNameLower].updateMany({
//       where,
//       data,
//     });

//     return result;
//   }

//   async createMany(
//         data: any //Prisma.ModelNameCreateManyInput<ModelType<TModelName>>
//     ): Promise<Prisma.BatchPayload> {
//     const modelNameLower = this.modelName.toLowerCase() as keyof typeof prisma;
//     const prismaModel = this.prisma[modelNameLower] as any;

//     const result = await prismaModel[modelNameLower].createMany({
//       data,
//     });

//     return result;
//   }

//   async deleteMany(
//         where: any //Prisma.ModelNameDeleteManyArgs<ModelType<TModelName>>
//     ): Promise<Prisma.BatchPayload> {
//     const modelNameLower = this.modelName.toLowerCase() as keyof typeof prisma;
//     const prismaModel = this.prisma[modelNameLower] as any;

//     const result = await prismaModel[modelNameLower].deleteMany({
//       where,
//     });

//     return result;
//   }

// }