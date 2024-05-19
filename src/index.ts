import { PORT } from "@lib/config";
import app from "./app";


try {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
} catch (err) {
    console.log(err);
    process.exit(1);
}

process.on("uncaughtException", (e) => {
    console.log(e);
    process.exit(0);
})