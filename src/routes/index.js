import categoriasRoute from "./categoriasRoute.js";
import autoresRoute from "./autoresRoute.js";
import livrosRoute from "./livrosRoute.js";
import usuariosRoute from "./usuariosRoute.js";

function Routes(app) {
	categoriasRoute(app);
	autoresRoute(app);
	livrosRoute(app);
	usuariosRoute(app);
}

export default Routes;