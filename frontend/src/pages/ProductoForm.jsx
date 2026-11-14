import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtener, crear, actualizar } from '../services/productos';

export default function ProductoForm() {
  const { id } = useParams();           // undefined si es "nuevo"
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) obtener(id).then((p) => setForm({ name: p.name, description: p.description ?? '', price: p.price, stock: p.stock }));
  }, [id]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (id) await actualizar(id, form);
      else await crear(form);
      navigate('/productos');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>{id ? 'Editar producto' : 'Nuevo producto'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p><input name="name" value={form.name} onChange={onChange} placeholder="Nombre" required /></p>
      <p><input name="description" value={form.description} onChange={onChange} placeholder="Descripción" /></p>
      <p><input name="price" type="number" value={form.price} onChange={onChange} placeholder="Precio" required /></p>
      <p><input name="stock" type="number" value={form.stock} onChange={onChange} placeholder="Stock" required /></p>
      <button type="submit">{id ? 'Guardar cambios' : 'Crear'}</button>{' '}
      <button type="button" onClick={() => navigate('/productos')}>Cancelar</button>
    </form>
  );
}