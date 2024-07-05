import React from 'react';
import Constantes from "./Constantes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilaDeTablaDeEstudiante from './FilaDeTablaDeEstudiante';

class VerEstudiantes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            estudiantes: [],
        };
    }

    async componentDidMount() {
        const respuesta = await fetch(`${Constantes.RUTA_API}`);
        const estudiantes = await respuesta.json();
        this.setState({
            estudiantes: estudiantes,
        });
    }

    render() {
        return (
            <div>
                <div className="column">
                    <h1 className="is-size-3">Ver estudiantes</h1>
                    <ToastContainer></ToastContainer>
                </div>
                <div className="table-container">
                    <table className="table is-fullwidth is-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Fecha de Ingreso</th>
                                <th>Calificación</th>
                                <th>Colonia</th>
                                <th>Tutor</th>
                                <th>Número Telefónico</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.estudiantes.map(estudiante => {
                                return <FilaDeTablaDeEstudiante key={estudiante._id} estudiante={estudiante}></FilaDeTablaDeEstudiante>;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default VerEstudiantes;
