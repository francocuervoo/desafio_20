import { Router } from "express";

//import { productsControllers } from "../controllers/index.js";
//import validateAdmin from "../middlewares/validateAdmin.js";

import * as daosControllers from "../controllers/daos.controllers.js"

const productsRouter = Router();

productsRouter.get("/", daosControllers.getItems);
productsRouter.get("/:id", daosControllers.getItemById);
productsRouter.post("/", daosControllers.saveItem);
productsRouter.delete("/:id", daosControllers.deleteItem);
productsRouter.put("/:id", daosControllers.updateItem);

export default productsRouter;

