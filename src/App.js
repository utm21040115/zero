import Nav from "./Nav";
import AgregarStudent from "./AgregarStudent";
import VerEstudiantes from "./VerEstudiantes";
import EditarEstudiante from "./EditarEstudiante";
import {
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Nav />
      <div className="section">
        <div className="columns">
          <Switch>
            <Route path="/estudiantes/agregar">
              <AgregarStudent />
            </Route>
            <Route path="/estudiantes/editar/:id">
              <EditarEstudiante />
            </Route>
            <Route path="/estudiantes/ver">
              <VerEstudiantes />
            </Route>
            <Route exact path="/">
              <VerEstudiantes />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
