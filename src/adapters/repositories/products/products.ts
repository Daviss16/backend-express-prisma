import { PrismaClient } from "@prisma/client";
import { Product } from "../../../core/entities/products";
import { ProductRepository } from "../../../core/services/products/products";

export type PrismaProps = {
    prisma: PrismaClient;
}

export class ProductRepositoryPrisma implements ProductRepository {
    private constructor(readonly props: PrismaProps) {}

    public static build(props: PrismaProps){
        return new ProductRepositoryPrisma(props);
    }
    
    public async save(product: Product): Promise<void> {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        };

        await this.props.prisma.product.create({
            data
        });
    }

    public async list(): Promise<Product[]> {
        const aProducts = await this.props.prisma.product.findMany();
        
        const products: Product[] = aProducts.map((p) => {
            const {id, name, price, quantity} = p;
            return Product.with(id, name, price, quantity);
        });

        return products;
    }

    public async update(product: Product): Promise<void> {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        };

        await this.props.prisma.product.update({
            where: {
                id: product.id,
            },
            data
        });  
    }


    public async find(id: string): Promise<Product | null> {
        const aProducts = await this.props.prisma.product.findUnique({
            where: {id},
        });

        if(!aProducts){
            return null;
        };

        const {name, price, quantity} = aProducts;

        const product = Product.with(id, name, price, quantity);

        return product;
    }

}