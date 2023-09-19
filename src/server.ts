import 'dotenv/config';
import app from './app';
import startup from './startup';
import AppLogger from './utils/AppLogger';

const logger = AppLogger.init('server').logger;
const port = process.env.PORT || 5010;

startup().catch(console.error);

app.listen(`${port}`, (err, address) => {
    if(err) {
        logger.error(err);
        process.exit(1);
    }
    logger.info(`Server running on port: ${address}`)
});