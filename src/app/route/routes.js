import Contract from "../modules/contract/index.js";
import Job from "../modules/job/index.js";
import Profile from "../modules/profile/index.js";
import Admin from "../modules/admin/index.js";

export default (app) => {
  const apiVersion = "/v1";
  app.use(`${apiVersion}`, Profile);
  app.use(`${apiVersion}`, Contract);
  app.use(`${apiVersion}`, Job);
  app.use(`${apiVersion}`, Admin);
};
