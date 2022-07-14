import controller from "../controllers/usuariosController";

export default (app) => {
  app.get("/usuarios", controller.getUsuarios);
  app.get("/usuarios/:id", controller.getUsuarios);
  app.post("/usuarios", controller.persistir);
  app.post("/usuarios/deletar", controller.deletar);
}