import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, ArrowUpRight, ArrowDownLeft, User } from 'lucide-react';
import './Dashboard.css';

const CosmicCancerLogo = ({ size = 200, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 35C40 20 75 20 75 35C75 50 40 50 40 35" stroke="#39FF14" strokeWidth="1" />
    <path d="M60 65C60 80 25 80 25 65C25 50 60 50 60 65" stroke="#39FF14" strokeWidth="1" />
    <line x1="40" y1="35" x2="60" y2="65" stroke="#39FF14" strokeWidth="0.3" strokeDasharray="5 5" opacity="0.3" />
    <circle cx="40" cy="35" r="2.5" fill="#FF003C" opacity="0.8" />
    <circle cx="75" cy="35" r="1.5" fill="#FF003C" opacity="0.6" />
    <circle cx="60" cy="65" r="2.5" fill="#FF003C" opacity="0.8" />
    <circle cx="25" cy="65" r="1.5" fill="#FF003C" opacity="0.6" />
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const transaccionesPrueba = [
    { id: 1, tipo: 'Abono', monto: 50000, fecha: '2026-04-28', descripcion: 'Depósito Inicial' },
    { id: 2, tipo: 'Transferencia', monto: -15000, fecha: '2026-04-28', descripcion: 'Pago de Servicios' },
    { id: 3, tipo: 'Abono', monto: 12000, fecha: '2026-04-27', descripcion: 'Reembolso' },
    { id: 4, tipo: 'Transferencia', monto: -5000, fecha: '2026-04-26', descripcion: 'Cafetería' },
  ];

  if (!token) return null;

  return (
    <div className="dashboard-container">
      <CosmicCancerLogo size={400} className="watermark" aria-hidden="true" />
      
      <nav className="dashboard-nav" role="navigation" aria-label="Navegación principal">
        <div className="nav-logo">
          <LayoutDashboard className="neon-icon" size={24} aria-hidden="true" />
          <span>CYBER-BANCA</span>
        </div>
        <button onClick={handleLogout} className="logout-btn" aria-label="Cerrar sesión de forma segura">
          <LogOut size={20} aria-hidden="true" />
          <span>Desconectar</span>
        </button>
      </nav>

      <main className="dashboard-content">
        <header className="welcome-header">
          <section className="user-profile">
            <div className="avatar" aria-hidden="true">
              <User size={32} />
            </div>
            <div>
              <h1>Bienvenido, Agente</h1>
              <p>Estado de la cuenta: <span className="neon-green">ACTIVO</span></p>
            </div>
          </section>
          <section className="balance-card" role="region" aria-label="Información de saldo">
            <span className="label">SALDO DISPONIBLE</span>
            <h2 className="amount">$ 42.000,00</h2>
          </section>
        </header>

        <section className="transactions-section">
          <header className="section-header">
            <h3>Últimos Movimientos</h3>
          </header>
          <div className="transactions-list" role="list">
            {transaccionesPrueba.map((tx) => (
              <article key={tx.id} className="transaction-item" role="listitem">
                <div className={`tx-icon ${tx.monto > 0 ? 'bg-green' : 'bg-red'}`} aria-hidden="true">
                  {tx.monto > 0 ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div className="tx-info">
                  <p className="tx-desc">{tx.descripcion}</p>
                  <time className="tx-date" dateTime={tx.fecha}>{tx.fecha}</time>
                </div>
                <div className={`tx-amount ${tx.monto > 0 ? 'neon-green' : 'neon-red'}`} aria-label={`${tx.monto > 0 ? 'Abono de' : 'Cargo de'} ${tx.monto} pesos`}>
                  {tx.monto > 0 ? '+' : ''}{tx.monto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
