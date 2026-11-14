import { useEffect, useState } from 'react';

import {
    useNavigate,
    useParams
} from 'react-router-dom';

import {
    obtenerCita,
    crearCita,
    actualizarCita
} from '../services/Citas';

export default function CitaForm() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        user_id: '',
        taller_id: '',
        vehiculo_id: '',
        servicio_id: '',
        fecha: '',
        desc_problema: '',
        estado: 'pendiente',
        precio_final: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Cargar cita para editar
    useEffect(() => {

        if (id) {

            obtenerCita(id)
                .then(cita => {

                    setForm({
                        user_id: cita.user_id ?? '',
                        taller_id: cita.taller_id ?? '',
                        vehiculo_id: cita.vehiculo_id ?? '',
                        servicio_id: cita.servicio_id ?? '',
                        fecha: cita.fecha ? String(cita.fecha).slice(0, 10) : '',
                        desc_problema: cita.desc_problema ?? '',
                        estado: cita.estado ?? 'pendiente',
                        precio_final: cita.precio_final ?? ''
                    });

                })
                .catch(err => {

                    setError(
                        err.response?.data?.message ||
                        'Error al cargar la cita.'
                    );

                });

        }

    }, [id]);

    // Detectar cambios
    const onChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    // Crear o actualizar cita
    const onSubmit = async (e) => {

        e.preventDefault();

        setError('');
        setLoading(true);

        try {

            const datos = {
                user_id: Number(form.user_id),
                taller_id: Number(form.taller_id),
                vehiculo_id: Number(form.vehiculo_id),
                servicio_id: Number(form.servicio_id),
                fecha: form.fecha,
                desc_problema: form.desc_problema,
                estado: form.estado,
                precio_final: form.precio_final === ''
                    ? null
                    : Number(form.precio_final)
            };

            if (id) {

                await actualizarCita(id, datos);

            } else {

                await crearCita(datos);

            }

            navigate('/citas');

        } catch (err) {

            const errores = err.response?.data?.errors;

            const mensaje = errores
                ? Object.values(errores).flat().join(' ')
                : err.response?.data?.message;

            setError(
                mensaje || 'No se pudo guardar la cita.'
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <h1>
                {id ? 'Editar cita' : 'Registrar nueva cita'}
            </h1>

            {error && (
                <p style={{ color: 'red' }}>
                    {error}
                </p>
            )}

            <form onSubmit={onSubmit}>

                <p>
                    <label>ID del usuario:</label>
                    <br />

                    <input
                        type="number"
                        name="user_id"
                        min="1"
                        value={form.user_id}
                        onChange={onChange}
                        required
                    />
                </p>

                <p>
                    <label>ID del taller:</label>
                    <br />

                    <input
                        type="number"
                        name="taller_id"
                        min="1"
                        value={form.taller_id}
                        onChange={onChange}
                        required
                    />
                </p>

                <p>
                    <label>ID del vehículo:</label>
                    <br />

                    <input
                        type="number"
                        name="vehiculo_id"
                        min="1"
                        value={form.vehiculo_id}
                        onChange={onChange}
                        required
                    />
                </p>

                <p>
                    <label>ID del servicio:</label>
                    <br />

                    <input
                        type="number"
                        name="servicio_id"
                        min="1"
                        value={form.servicio_id}
                        onChange={onChange}
                        required
                    />
                </p>

                <p>
                    <label>Fecha:</label>
                    <br />

                    <input
                        type="date"
                        name="fecha"
                        value={form.fecha}
                        onChange={onChange}
                        required
                    />
                </p>

                <p>
                    <label>Descripción del problema:</label>
                    <br />

                    <textarea
                        name="desc_problema"
                        value={form.desc_problema}
                        onChange={onChange}
                        placeholder="Describe el problema del vehículo"
                        rows="4"
                    />
                </p>

                <p>
                    <label>Estado:</label>
                    <br />

                    <select
                        name="estado"
                        value={form.estado}
                        onChange={onChange}
                        required
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmada">Confirmada</option>
                        <option value="completada">Completada</option>
                        <option value="cancelada">Cancelada</option>
                    </select>
                </p>

                <p>
                    <label>Precio final:</label>
                    <br />

                    <input
                        type="number"
                        name="precio_final"
                        min="0"
                        step="0.01"
                        value={form.precio_final}
                        onChange={onChange}
                    />
                </p>

                <button type="submit" disabled={loading}>
                    {loading
                        ? 'Guardando...'
                        : id
                            ? 'Actualizar cita'
                            : 'Crear cita'
                    }
                </button>

                {' '}

                <button
                    type="button"
                    onClick={() => navigate('/citas')}
                >
                    Cancelar
                </button>

            </form>

        </div>

    );

}