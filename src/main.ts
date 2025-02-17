import { ProductRepositoryPrisma } from "./adapters/repositories/products/products";
import { ProductServiceImpl } from "./core/services/products/products";
import { ProductController } from "./adapters/controllers/products/products";
import { prisma } from "./configuration/prisma";
import { Router } from "./adapters/controllers/products/routers/routers";


function main() {
    const repository = ProductRepositoryPrisma.build({prisma: prisma});
    const service = ProductServiceImpl.build({repository: repository});
    const controller = ProductController.build({service: service});
    
    const api = Router.build();
    api.register(controller);
    api.start(8080);
}

main();
