import Categoria from "./Categoria";
(async () => {
  await Categoria.sync({ force: true });
})()