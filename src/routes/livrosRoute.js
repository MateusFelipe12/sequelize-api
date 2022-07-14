import controller from "../controllers/livrosController";

export default (app) => {
  app.get("/livros", controller.getLivros);
  app.get("/livros/:id", controller.getLivros);
  app.post("/livros", controller.persistir);
  app.post("/livros/deletar", controller.deletar);
}