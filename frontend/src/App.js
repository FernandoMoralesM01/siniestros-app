import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Contexto de autenticación
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Páginas públicas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';

// Páginas protegidas
import Dashboard from './pages/Dashboard';
import SiniestrosList from './pages/siniestros/SiniestrosList';
import SiniestroDetail from './pages/siniestros/SiniestroDetail';
import NewSiniestro from './pages/siniestros/NewSiniestro';
import DocumentsList from './pages/documents/DocumentsList';

// Páginas de documentos
import UploadDocument from './pages/documents/UploadDocument';
import DocumentDetail from './pages/documents/DocumentDetail';
import OcrTool from './pages/documents/OcrTool';

// Crear tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul
    },
    secondary: {
      main: '#f50057', // Rosa
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Rutas protegidas dentro del layout principal */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="siniestros" element={<SiniestrosList />} />
              <Route path="siniestros/nuevo" element={<NewSiniestro />} />
              <Route path="siniestros/:siniestroId" element={<SiniestroDetail />} />
              <Route path="siniestros/:siniestroId/editar" element={<div>Editar Siniestro (Próximamente)</div>} />
              <Route path="documentos" element={<DocumentsList />} />
              <Route path="documentos/subir" element={<UploadDocument />} />
              <Route path="documentos/:documentId" element={<DocumentDetail />} />
              <Route path="siniestros/:siniestroId/documentos" element={<DocumentsList />} />
              <Route path="siniestros/:siniestroId/documentos/subir" element={<UploadDocument />} />
              <Route path="herramientas/ocr" element={<OcrTool />} />
              <Route 
                path="usuarios" 
                element={
                  <ProtectedRoute requiredRole="agent">
                    <div>Gestión de Usuarios (Próximamente)</div>
                  </ProtectedRoute>
                } 
              />
              <Route path="profile" element={<div>Perfil de Usuario (Próximamente)</div>} />
            </Route>

            {/* Ruta por defecto - redirige a home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;