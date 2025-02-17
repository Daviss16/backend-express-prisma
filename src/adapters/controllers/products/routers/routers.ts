import express, {Express, Request, Response} from "express";
import { ProductController } from "../products";

export interface Api {
    start(port: number): void;
}

export class Router implements Api {
    private constructor(readonly app: Express) {}
    
    public static build() {
        const app = express();
        app.use(express.json());
        return new Router(app);
    }

    public addGetRoute(path: string, handler:(req:Request, res:Response) => void):void {
        this.app.get(path, handler);
    }

    public addPostRoute(path: string, handler:(req:Request, res:Response) => void):void {
        this.app.post(path, handler);
    }

    public register(controller: ProductController){
        this.addGetRoute("/products",controller.list.bind(controller));
        this.addPostRoute("/products/create",controller.create.bind(controller));
        this.addPostRoute("/products/:id/buy",controller.buy.bind(controller));
        this.addPostRoute("/products/:id/sell",controller.sell.bind(controller));
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log("Server runing on port "+port);
            this.printRoutes();
        });
    }

    private printRoutes() {
        const routes = this.app._router.stack
        .filter((route: any) => route.route)
        .map((route: any) => {     
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            };
        });
        console.log(routes);
    }

}