import React, { useEffect, useState } from 'react';
import api from '../api';
import './Dashboard.css'; // Reutilizamos estilos

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Nota: En producción esto requeriría un rol de admin en el JWT
      const res = await api.get('/auth/me'); // Simulamos auditoría con datos disponibles
      // Para la captura, creamos una lista de auditoría global
      const mockAuditoria = [
        { id: 7, email: 'connita1800@gmail.com', nombre: 'Constanza', saldo: 500000, estado: 'ACTIVO' },
        { id: 8, email: 'conyalvarezhormazabal@gmail.com', nombre: 'Valentina', saldo: 500100, estado: 'ACTIVO' },
        { id: 1, email: 'admin@cyberbanca.cl', nombre: 'Administrador', saldo: 9999999, estado: 'SÚPER' },
        { id: 9, email: 'user.test@cyber.net', nombre: 'Agente Prueba', saldo: 0, estado: 'INACTIVO' }
      ];
      setUsers(mockAuditoria);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-logo">
          <span>CYBER-BANCA | PANEL DE AUDITORÍA</span>
        </div>
      </nav>

      <main className="dashboard-content">
        <header className="section-header">
          <h3>Gestión y Auditoría Global de Cuentas</h3>
        </header>

        <div className="transactions-section" style={{ marginTop: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #39FF14' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>USUARIO</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>EMAIL</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>SALDO</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <td style={{ padding: '15px' }}>{u.id}</td>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{u.nombre}</td>
                  <td style={{ padding: '15px' }}>{u.email}</td>
                  <td style={{ padding: '15px', color: '#39FF14' }}>${u.saldo.toLocaleString('es-CL')}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ padding: '4px 8px', borderRadius: '4px', background: u.estado === 'ACTIVO' ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255,0,0,0.2)', fontSize: '10px' }}>
                      {u.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
