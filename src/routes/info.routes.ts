import { Router } from 'express';
import os from 'os';

const router = Router();
router.get('/cpu', (req, res) => {
    const cpus = os.cpus();
    res.json(cpus);
});

router.get('/memory', (req, res) => {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    res.json({ totalMemory, freeMemory });
});

router.get('/os', (req, res) => {
    const platform = os.platform();
    const release = os.release();
    const uptime = os.uptime();
    res.json({ platform, release, uptime });
});

router.get('/network', (req, res) => {
    const networkInterfaces = os.networkInterfaces();
    res.json(networkInterfaces);
});


const infoRouter = Router();
infoRouter.use("/info", router)

export default infoRouter;