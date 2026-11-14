import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listar, eliminar } from '../services/productos';

export default function ProductosList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listar()
      .then(setItems)
      .catch(() => setError('No se pudo conectar con la API (¿servidor apagado o CORS?)'))
      .finally(() => setLoading(false));
  }, []);

  const borrar = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    await eliminar(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Productos</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <Link to={`/productos/${p.id}/editar`}>Editar</Link>{' '}
                <button onClick={() => borrar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}