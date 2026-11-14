import { Routes, Route, Link, Navigate } from 'react-router-dom';

// Importar páginas de usuarios
import UsuariosList from './pages/UsuariosList.jsx';
import UsuarioForm from './pages/UsuarioForm.jsx';

// Importar páginas de citas
import CitasList from './pages/CitasList.jsx';
import CitaForm from './pages/CitaForm.jsx';

export default function App() {

    return (
        <>

            <nav style={{
                display: 'flex',
                gap: 20,
                padding: 16,
                backgroundColor: '#20201f'
            }}>

                <Link to="/usuarios" style={{ color: 'white' }}>
                    Usuarios
                </Link>

                <Link to="/citas" style={{ color: 'white' }}>
                    Citas
                </Link>

            </nav>

            <main style={{ padding: 20 }}>

                <Routes>

                    <Route
                        path="/"
                        element={<Navigate to="/usuarios" replace />}
                    />

                    {/* CRUD USUARIOS */}

                    <Route
                        path="/usuarios"
                        element={<UsuariosList />}
                    />

                    <Route
                        path="/usuarios/nuevo"
                        element={<UsuarioForm />}
                    />

                    <Route
                        path="/usuarios/:id/editar"
                        element={<UsuarioForm />}
                    />

                    {/* CRUD CITAS */}

                    <Route
                        path="/citas"
                        element={<CitasList />}
                    />

                    <Route
                        path="/citas/nueva"
                        element={<CitaForm />}
                    />

                    <Route
                        path="/citas/:id/editar"
                        element={<CitaForm />}
                    />

                    <Route
                        path="*"
                        element={<h2>Página no encontrada</h2>}
                    />

                </Routes>

            </main>

        </>
    );
}