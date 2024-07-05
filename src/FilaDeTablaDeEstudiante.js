import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Constantes from './Constantes';

class FilaDeTablaDeEstudiante extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Si han eliminado este estudiante, no necesitamos mostrarlo
            eliminado: false,
        };
        this.redireccionarParaEditar = this.redireccionarParaEditar.bind(this);
        this.eliminar = this.eliminar.bind(this);
    }

    redireccionarParaEditar() {
        return <Redirect to={`/estudiantes/editar/${this.props.estudiante.id}`} />
    }

    async eliminar() {
        const resultado = await Swal.fire({
            title: 'Confirmación',
            text: `¿Eliminar "${this.props.estudiante.nombre}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3298dc',
            cancelButtonColor: '#f14668',
            cancelButtonText: 'No',
            confirmButtonText: 'Sí, eliminar'
        });
        // Si no confirma, detenemos la función
        if (!resultado.value) {
            return;
        }
        const respuesta = await fetch(`${Constantes.RUTA_API}/${this.props.estudiante._id}`, {
            method: "DELETE",
        });
        const exitoso = await respuesta.json();
        if (exitoso) {
            toast('Estudiante eliminado ', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({
                eliminado: true,
            });
        } else {
            toast.error("Error eliminando. Intenta de nuevo");
        }
    }

    render() {
        if (this.state.eliminado) {
            return null;
        }
        return (
            <tr>
                <td>{this.props.estudiante.nombre}</td>
                <td>{this.props.estudiante.FechaIngreso}</td>
                <td>{this.props.estudiante.calificacion}</td>
                <td>{this.props.estudiante.colonia}</td>
                <td>{this.props.estudiante.tutor}</td>
                <td>{this.props.estudiante.numerotelefonico}</td>
                <td>
                    <Link to={`/estudiantes/editar/${this.props.estudiante._id}`} className="button is-info">Editar</Link>
                </td>
                <td>
                    <button onClick={this.eliminar} className="button is-danger">Eliminar</button>
                </td>
            </tr>
        );
    }
}

export default FilaDeTablaDeEstudiante;
