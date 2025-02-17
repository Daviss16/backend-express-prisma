export type CreateOutputDTO = {
    id: string,
    name: string,
    price: number,
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