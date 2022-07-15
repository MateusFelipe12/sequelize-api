import categoriasRoute from "./categoriasRoute.js";
import autoresRoute from "./autoresRoute.js";
import livrosRoute from "./livrosRoute.js";
import usuariosRoute from "./usuariosRoute.js";
import emprestimoRoute from "./emprestimoRoute.js";

function Routes(app) {
	categoriasRoute(app);
	autoresRoute(app);
	livrosRoute(app);
	usuariosRoute(app);
	emprestimoRoute(app);
}

export default Routes;