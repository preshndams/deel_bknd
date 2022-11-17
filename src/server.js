import app from "./app/route/index.js";
import { PORT } from "./app/utils/constant.js";

(async function init() {
  try {
    app.listen(PORT, () => {
      console.log(` ===== Express App Listening on Port ${PORT} ======`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
})();
