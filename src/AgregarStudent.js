import React from 'react';
import Constantes from "./Constantes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

class AgregarEstudiante extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            estudiante: {
                nombre: "",
                FechaIngreso: "",
                calificacion: "",
                colonia: "",
                tutor: "",
                numerotelefonico: "",
            },
        };
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioDeFormulario = this.manejarEnvioDeFormulario.bind(this);
    }

    render() {
        return (
            <div className="column is-one-third">
                <h1 className="is-size-3">Agregar Estudiante</h1>
                <ToastContainer></ToastContainer>
                <form className="field" onSubmit={this.manejarEnvioDeFormulario}>
                    <div className="form-group">
                        <label className="label" htmlFor="nombre">Nombre:</label>
                        <input autoFocus required placeholder="Nombre" type="text" id="nombre" onChange={this.manejarCambio} value={this.state.estudiante.nombre} className="input" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="FechaIngreso">Fecha de Ingreso:</label>
                        <input required placeholder="Fecha de Ingreso" type="number" id="FechaIngreso" onChange={this.manejarCambio} value={this.state.estudiante.FechaIngreso} className="input" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="calificacion">Calificación:</label>
                        <input required placeholder="Calificación" type="number" id="calificacion" onChange={this.manejarCambio} value={this.state.estudiante.calificacion} className="input" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="colonia">Colonia:</label>
                        <input required placeholder="Colonia" type="text" id="colonia" onChange={this.manejarCambio} value={this.state.estudiante.colonia} className="input" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="tutor">Tutor:</label>
                        <input required placeholder="Tutor" type="text" id="tutor" onChange={this.manejarCambio} value={this.state.estudiante.tutor} className="input" />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="numerotelefonico">Número Telefónico:</label>
                        <input required placeholder="Número Telefónico" type="number" id="numerotelefonico" onChange={this.manejarCambio} value={this.state.estudiante.numerotelefonico} className="input" />
                    </div>
                    <div className="form-group">
                        <button className="button is-success mt-2">Guardar</button>
                        &nbsp;
                        <Link to="/estudiantes/ver" className="button is-primary mt-2">Volver</Link>
                    </div>
                </form>
            </div>
        );
    }

    async manejarEnvioDeFormulario(evento) {
        evento.preventDefault();
        const cargaUtil = JSON.stringify(this.state.estudiante);
        const respuesta = await fetch(`${Constantes.RUTA_API}`, {
            method: "POST",
            body: cargaUtil,
            headers: {
                "Content-Type": "application/json",
            }
        });
        const exitoso = await respuesta.json();
        if (exitoso) {
            toast('Estudiante guardado 📚', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({
                estudiante: {
                    nombre: "",
                    FechaIngreso: "",
                    calificacion: "",
                    colonia: "",
                    tutor: "",
                    numerotelefonico: "",
                }
            });
        } else {
            toast.error("Error guardando. Intenta de nuevo");
        }
    }

    manejarCambio(evento) {
        const clave = evento.target.id;
        let valor = evento.target.value;
        this.setState(state => {
            const estudianteActualizado = state.estudiante;
            if (clave !== "nombre" && clave !== "colonia" && clave !== "tutor") {
                valor = parseFloat(valor);
            }
            estudianteActualizado[clave] = valor;
            return {
                estudiante: estudianteActualizado,
            }
        });
    }
}

export default AgregarEstudiante;
