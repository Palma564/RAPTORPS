import { useEffect, useState } from 'react';

import {
    useNavigate,
    useParams
} from 'react-router-dom';

import {
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario
} from '../services/usuarios';

export default function UsuarioForm() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        celular: '',
        rol: '',
        password: '',
        password_confirmation: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Cargar usuario para editar
    useEffect(() => {

        if (id) {

            obtenerUsuario(id)
                .then(usuario => {

                    setForm({
                        name: usuario.name || '',
                        email: usuario.email || '',
                        celular: usuario.celular || '',
                        rol: usuario.rol || '',
                        password: '',
                        password_confirmation: ''
                    });

                })
                .catch(err => {

                    setError(
                        err.response?.data?.message ||
                        'Error al cargar el usuario.'
                    );

                });

        }

    }, [id]);

    // Detectar cambios en los campos
    const onChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    // Crear o actualizar usuario
    const onSubmit = async (e) => {

        e.preventDefault();

        setError('');
        setLoading(true);

        try {

            const datos = {
                name: form.name,
                email: form.email,
                celular: form.celular,
                rol: form.rol
            };

            // Solo enviar contraseña si se escribió
            if (form.password !== '') {

                datos.password = form.password;

                datos.password_confirmation =
                    form.password_confirmation;

            }

            if (id) {

                await actualizarUsuario(id, datos);

            } else {

                await crearUsuario(datos);

            }

            navigate('/usuarios');

        } catch (err) {

            const errores = err.response?.data?.errors;

            const mensaje = errores
                ? Object.values(errores).flat().join(' ')
                : err.response?.data?.message;

            setError(
                mensaje || 'No se pudo guardar el usuario.'
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <h1>
                {id ? 'Editar usuario' : 'Registrar usuario'}
            </h1>

            {error && (
                <p style={{ color: 'red' }}>
                    {error}
                </p>
            )}

            <form onSubmit={onSubmit}>

                <p>
                    <label>Nombre:</label>
                    <br />

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="Ingrese el nombre"
                        required
                    />
                </p>

                <p>
                    <label>Correo electrónico:</label>
                    <br />

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="Ingrese el correo"
                        required
                    />
                </p>

                <p>
                    <label>Celular:</label>
                    <br />

                    <input
                        type="text"
                        name="celular"
                        value={form.celular}
                        onChange={onChange}
                        placeholder="Número de celular"
                    />
                </p>

                <p>
                    <label>Rol:</label>
                    <br />

                    <input
                        type="text"
                        name="rol"
                        value={form.rol}
                        onChange={onChange}
                        placeholder="Ingrese el rol"
                    />
                </p>

                <p>
                    <label>Contraseña:</label>
                    <br />

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        placeholder={
                            id
                                ? 'Dejar vacío para conservar la contraseña'
                                : 'Ingrese la contraseña'
                        }
                        required={!id}
                    />
                </p>

                <p>
                    <label>Confirmar contraseña:</label>
                    <br />

                    <input
                        type="password"
                        name="password_confirmation"
                        value={form.password_confirmation}
                        onChange={onChange}
                        placeholder="Repita la contraseña"
                        required={
                            !id || form.password !== ''
                        }
                    />
                </p>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? 'Guardando...'
                        : id
                            ? 'Actualizar usuario'
                            : 'Crear usuario'
                    }
                </button>

                {' '}

                <button
                    type="button"
                    onClick={() => navigate('/usuarios')}
                >
                    Cancelar
                </button>

            </form>

        </div>

    );

}