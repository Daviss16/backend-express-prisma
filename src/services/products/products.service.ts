export type CreateOutputDTO = {
    id: string,
    balance: number
};

export type SellOutputDTO = {
    id: string,
    balance: number
};

export type BuyOutputDTO = {
    id: string,
    balance: number
};

export type ListOutputDTO = {
    products: {
        id: string,
        name: string,
        price: number,
        balance: number
    }[];
};


export interface ProductService {
    create(name: string, price: number): Promise<CreateOutputDTO>;
    sell(id: string, amount: number): Promise<SellOutputDTO>;
    buy(id: string, amount: number): Promise<BuyOutputDTO>;
    list(): Promise<ListOutputDTO>;
};