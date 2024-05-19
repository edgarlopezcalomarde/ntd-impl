import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const routesPath = __dirname;

fs.readdirSync(routesPath).forEach((file) => {
    if (file.includes('.routes.')) {
        const filePath = path.join(routesPath, file);
        import(filePath).then((routeModule) => {
            if (routeModule.default) {
                router.use('/', routeModule.default);
            }
        }).catch(err => console.error(`Error importing route ${filePath}:`, err));
    }
});

export default router;
