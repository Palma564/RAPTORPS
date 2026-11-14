import api from '../api/axios';

export const listarCitas = () =>
    api.get('/citas').then(res => res.data);

export const obtenerCita = (id) =>
    api.get(`/citas/${id}`).then(res => res.data);

export const crearCita = (datos) =>
    api.post('/citas', datos).then(res => res.data);

export const actualizarCita = (id, datos) =>
    api.put(`/citas/${id}`, datos).then(res => res.data);

export const eliminarCita = (id) =>
    api.delete(`/citas/${id}`);