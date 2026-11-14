import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    listarUsuarios,
    eliminarUsuario
} from '../services/usuarios';

export default function UsuariosList() {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Consultar usuarios
    const cargarUsuarios = async () => {

        try {

            setError('');

            const datos = await listarUsuarios();

            setUsuarios(Array.isArray(datos) ? datos : []);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                'Error al cargar los usuarios.'
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    // Eliminar usuario
    const borrarUsuario = async (id) => {

        const confirmar = window.confirm(
            '¿Deseas eliminar este usuario?'
        );

        if (!confirmar) return;

        try {

            await eliminarUsuario(id);

            setUsuarios(
                usuarios.filter(usuario => usuario.id !== id)
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                'No se pudo eliminar el usuario.'
            );

        }

    };

    if (loading) {
        return <h3>Cargando usuarios...</h3>;
    }

    return (

        <div>

            <h1>Usuarios</h1>

            <p>Listado de usuarios registrados en RAPTOR.</p>

            <Link to="/usuarios/nuevo">
                <button>+ Registrar usuario</button>
            </Link>

            {error && (
                <p style={{ color: 'red' }}>
                    {error}
                </p>
            )}

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '20px'
                }}
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Celular</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    {usuarios.length === 0 ? (

                        <tr>
                            <td colSpan="6">
                                No hay usuarios registrados.
                            </td>
                        </tr>

                    ) : (

                        usuarios.map(usuario => (

                            <tr key={usuario.id}>

                                <td>{usuario.id}</td>

                                <td>{usuario.name}</td>

                                <td>{usuario.email}</td>

                                <td>{usuario.celular || 'No registrado'}</td>

                                <td>{usuario.rol || 'Sin rol'}</td>

                                <td>

                                    <Link
                                        to={`/usuarios/${usuario.id}/editar`}
                                    >
                                        <button>Editar</button>
                                    </Link>

                                    {' '}

                                    <button
                                        onClick={() =>
                                            borrarUsuario(usuario.id)
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