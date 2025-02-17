import { ProductService } from "../../../adapters/controllers/products/products";
import { Product } from "../../entities/products";

export interface ProductRepository {
    save(product: Product): Promise<void>;
    list(): Promise<Product[]>;
    update(product: Product): Promise<void>;
    find(id: string): Promise<Product | null>;
}

export type RepositoryProps = {
    repository: ProductRepository
}

export class ProductServiceImpl implements ProductService {
    private constructor(readonly props: RepositoryProps) {}
    
    public static build(props: RepositoryProps) {
        return new ProductServiceImpl(props);
    }    

    public async create(name: string, price: number): Promise<Product> {
        const aProduct = Product.create(name,price);

        await this.props.repository.save(aProduct);

        const output = aProduct;
        return output;
    }
    
    public async sell(id: string, amount: number): Promise<Product> {
        const aProduct = await this.props.repository.find(id);
       
        if(!aProduct) {
            throw new Error("O produto "+ id +" não foi encontrado");
        }

        aProduct.sell(amount);

        await this.props.repository.update(aProduct);

        const output = aProduct;
        return output;
    }


    public async buy(id: string, amount: number): Promise<Product> {
        const aProduct = await this.props.repository.find(id);
        
        if(!aProduct) {
            throw new Error("O produto "+ id +" não foi encontrado");
        }

        aProduct.buy(amount);

        await this.props.repository.update(aProduct);

        const output = aProduct;
        return output;
    }

    public async list(): Promise<Product[]> {
        const aProducts = await this.props.repository.list();

        const output = aProducts;
        return output;
    }

}