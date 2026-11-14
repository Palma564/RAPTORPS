import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    listarCitas,
    eliminarCita
} from '../services/Citas';

export default function CitasList() {

    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Consultar citas
    const cargarCitas = async () => {

        try {

            setError('');

            const datos = await listarCitas();

            setCitas(Array.isArray(datos) ? datos : []);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                'Error al cargar las citas.'
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        cargarCitas();
    }, []);

    // Eliminar cita
    const borrarCita = async (id) => {

        const confirmar = window.confirm(
            '¿Deseas eliminar esta cita?'
        );

        if (!confirmar) return;

        try {

            await eliminarCita(id);

            setCitas(
                citas.filter(cita => cita.id !== id)
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                'No se pudo eliminar la cita.'
            );

        }

    };

    if (loading) {
        return <h3>Cargando citas...</h3>;
    }

    return (

        <div>

            <h1>Listado de citas</h1>

            <p>Administración de las citas registradas en RAPTOR.</p>

            <Link to="/citas/nueva">
                <button>+ Registrar cita</button>
            </Link>

            {error && (
                <p style={{ color: 'red' }}>
                    {error}
                </p>
            )}

            <table
                border="1"
                cellPadding="8"
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '20px'
                }}
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Taller</th>
                        <th>Vehículo</th>
                        <th>Servicio</th>
                        <th>Fecha</th>
                        <th>Problema</th>
                        <th>Estado</th>
                        <th>Precio final</th>
                        <th>Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    {citas.length === 0 ? (

                        <tr>
                            <td colSpan="10">
                                No hay citas registradas.
                            </td>
                        </tr>

                    ) : (

                        citas.map(cita => (

                            <tr key={cita.id}>

                                <td>{cita.id}</td>

                                <td>{cita.user_id}</td>

                                <td>{cita.taller_id}</td>

                                <td>{cita.vehiculo_id}</td>

                                <td>{cita.servicio_id}</td>

                                <td>{cita.fecha}</td>

                                <td>{cita.desc_problema || 'Sin descripción'}</td>

                                <td>{cita.estado}</td>

                                <td>{cita.precio_final ?? 'Sin precio'}</td>

                                <td>

                                    <Link
                                        to={`/citas/${cita.id}/editar`}
                                    >
                                        <button>Editar</button>
                                    </Link>

                                    {' '}

                                    <button
                                        onClick={() =>
                                            borrarCita(cita.id)
                                        }
                                    >
                                        Eliminar
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}