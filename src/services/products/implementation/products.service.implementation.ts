import { Product } from "../../../entities/products";
import { ProductRepository } from "../../../repositories/products/products.repository";
import { BuyOutputDTO, CreateOutputDTO, ListOutputDTO, ProductService, SellOutputDTO } from "../products.service";

export class ProductServiceImplementation implements ProductService {
    private constructor(readonly repository: ProductRepository) {}
    
    public static build(repository: ProductRepository) {
        return new ProductServiceImplementation(repository);
    }    

    public async create(name: string, price: number): Promise<CreateOutputDTO> {
        const aProduct = Product.create(name,price);

        await this.repository.save(aProduct);

        const output: CreateOutputDTO = {
            id: aProduct.id,
            balance: aProduct.quantity
        };

        return output;
    }
    
    public async sell(id: string, amount: number): Promise<SellOutputDTO> {
        const aProduct = await this.repository.find(id);
       
        if(!aProduct) {
            throw new Error("O produto "+ id +" não foi encontrado");
        }

        aProduct.sell(amount);

        await this.repository.update(aProduct);

        const output: SellOutputDTO = {
            id: aProduct.id,
            balance: aProduct.quantity
        };

        return output;
    }


    public async buy(id: string, amount: number): Promise<BuyOutputDTO> {
        const aProduct = await this.repository.find(id);
        
        if(!aProduct) {
            throw new Error("O produto "+ id +" não foi encontrado");
        }

        aProduct.buy(amount);

        await this.repository.update(aProduct);

        const output: BuyOutputDTO = {
            id: aProduct.id,
            balance: aProduct.quantity
        };
        
        return output;
    }

    public async list(): Promise<ListOutputDTO> {
        const aProducts = await this.repository.list();
        
        const products = aProducts.map((p) => {
            return {
                id: p.id,
                name: p.name,
                price: p.price,
                balance: p.quantity
            };
        });

        const output: ListOutputDTO = {
            products
        };

        return output;
    }

}