import api from '../api/axios';

export const listarUsuarios = () =>
    api.get('/users').then(res => res.data);

export const obtenerUsuario = (id) =>
    api.get(`/users/${id}`).then(res => res.data);

export const crearUsuario = (datos) =>
    api.post('/users', datos).then(res => res.data);

export const actualizarUsuario = (id, datos) =>
    api.put(`/users/${id}`, datos).then(res => res.data);

export const eliminarUsuario = (id) =>
    api.delete(`/users/${id}`);