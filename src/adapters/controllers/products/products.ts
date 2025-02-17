import { BuyOutputDTO, CreateOutputDTO, ListOutputDTO, SellOutputDTO } from "./dto/dto";
import { Request, Response } from "express";
import { Product } from "../../../core/entities/products";

export interface ProductService {
    create(name: string, price: number): Promise<Product>;
    sell(id: string, amount: number): Promise<Product>;
    buy(id: string, amount: number): Promise<Product>;
    list(): Promise<Product[]>;
};

export type ServiceProps = {
    service: ProductService
}

export class ProductController {
    private constructor(readonly props: ServiceProps) {}

    public static build(props: ServiceProps){
        return new ProductController(props);
    }

    public async create(request: Request, response: Response) {
        const {name, price} = request.body;

        const output = await this.props.service.create(name,price);

        const data : CreateOutputDTO = {
            id: output.id,
            name,
            price,
            balance: output.quantity
        };

        response.status(201).json(data);
    }

    public async list(request: Request, response: Response) {
        const output = await this.props.service.list();

        const data : ListOutputDTO = {
            products: output.map((p) => {
                return {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    balance: p.quantity
                }
            })
        }

        response.status(200).json(data);
    }

    public async buy(request: Request, response: Response) {
        const { id } = request.params;
        const {amount} = request.body;


        const output = await this.props.service.buy(id,amount);

        const data : BuyOutputDTO = {
            id: output.id,
            balance: output.quantity
        };

        response.status(200).json(data);
    }

    public async sell(request: Request, response: Response) {
        const { id } = request.params;
        const {amount} = request.body;

        const output = await this.props.service.sell(id,amount);

        const data : SellOutputDTO = {
            id: output.id,
            balance: output.quantity
        };

        response.status(200).json(data);
    }

}