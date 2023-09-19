import { Prisma, PrismaClient } from '../prisma/generated/client';

const prisma = new PrismaClient();

export declare namespace appModelTypes {
  
  interface IBlog {
    id?: number;
    title: string;
    content: string;
    author: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  type ModelName = 'Blog' //| 'Post'; // Add more model names as needed
  type ModelType<TModelName> = TModelName extends 'Blog'
  ? import('../prisma/generated/client').Blog
  : never
  // type DomainClass<M> = new () => M;
  
  abstract class AbstractCrudRepository<M extends ModelName> {
    private readonly modelName: string;

    constructor(modelName: string) {
      this.modelName = modelName;
    }

    async save(data: Prisma.CreateArgs<M['create']>): Promise<M> {
      return prisma[this.modelName].create({ data });
    }

    async exist(where: Prisma.ModelFindFirstArgs<M>): Promise<boolean> {
      const record = await prisma[this.modelName].findFirst({ where });
      return !!record;
    }

    async findById(id: number): Promise<M | null> {
      return prisma[this.modelName].findUnique({ where: { id } });
    }

    async findAll(): Promise<M[]> {
      return prisma[this.modelName].findMany();
    }

    async findOne(where: Prisma.ModelFindFirstArgs<M>): Promise<M | null> {
      return prisma[this.modelName].findUnique({ where });
    }

    async deleteById(id: number): Promise<void> {
      await prisma[this.modelName].delete({ where: { id } });
    }

    async deleteOne(where: Prisma.ModelDeleteArgs<M['delete']>): Promise<void> {
      await prisma[this.modelName].delete({ ...where });
    }

    async deleteAll(): Promise<void> {
      await prisma[this.modelName].deleteMany();
    }

    async update(id: number, data: Prisma.ModelUpdateArgs<M['update']>): Promise<M | null> {
      await prisma[this.modelName].update({ where: { id }, data });
      return this.findById(id);
    }

    async bulkCreate(data: Prisma.ModelCreateManyArgs<M['createMany']>): Promise<M[]> {
      return prisma[this.modelName].createMany({ data });
    }
  }

  export interface ICrudDAO<M extends Prisma.Model<Prisma.ModelArgs<M, PrismaClient>>> {
    create(data: Prisma.CreateArgs<M['create']>): Promise<M>;

    update(id: number, data: Prisma.ModelUpdateArgs<M['update']>): Promise<M | null>;

    findById(id: number): Promise<M | null>;

    deleteById(id: number): Promise<void>;

    findByAny(where: Prisma.ModelFindFirstArgs<M>): Promise<M | null>;

    findAll(): Promise<M[]>;
  }
}
