import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import api from '../api';
import './Login.css';

const CosmicCancerLogo = ({ size = 80, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 35C40 20 75 20 75 35C75 50 40 50 40 35" stroke="#39FF14" strokeWidth="1.5" />
    <path d="M60 65C60 80 25 80 25 65C25 50 60 50 60 65" stroke="#39FF14" strokeWidth="1.5" />
    <line x1="40" y1="35" x2="60" y2="65" stroke="#39FF14" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
    <circle cx="40" cy="35" r="3" fill="#FF003C" className="star-point" />
    <circle cx="75" cy="35" r="2" fill="#FF003C" />
    <circle cx="57" cy="42" r="1.5" fill="#FF003C" />
    <circle cx="60" cy="65" r="3" fill="#FF003C" className="star-point" />
    <circle cx="25" cy="65" r="2" fill="#FF003C" />
    <circle cx="43" cy="58" r="1.5" fill="#FF003C" />
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/inicio');
      }
    } catch (err) {
      console.error('Error de login:', err);
      setError(err.response?.data?.error || 'ACCESO DENEGADO: Credenciales incorrectas o fallo de red.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="cyber-container">
      <div className="scanline" aria-hidden="true"></div>
      <div className="cyber-card" role="region" aria-labelledby="login-title">
        <header className="cyber-header">
          <CosmicCancerLogo className="cyber-logo" />
          <h1 id="login-title">CYBER-BANCA</h1>
          <p className="status-text">SISTEMA DE SEGURIDAD NIVEL 4</p>
        </header>

        <form onSubmit={handleSubmit} className="cyber-form">
          <div className="cyber-input-group">
            <label htmlFor="login-email">IDENTIFICADOR (EMAIL)</label>
            <div className="cyber-input-wrapper">
              <Mail className="cyber-icon" size={18} aria-hidden="true" />
              <input
                id="login-email"
                type="email"
                placeholder="USUARIO@RED.NET"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Ingresa tu correo electrónico"
              />
            </div>
          </div>

          <div className="cyber-input-group">
            <label htmlFor="login-pass">LLAVE DE ACCESO (PASS)</label>
            <div className="cyber-input-wrapper">
              <Lock className="cyber-icon" size={18} aria-hidden="true" />
              <input
                id="login-pass"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Ingresa tu contraseña"
              />
            </div>
          </div>

          {error && (
            <div className="cyber-error" role="alert" aria-live="assertive">
              <AlertCircle size={16} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            className="cyber-button" 
            disabled={loading}
            aria-label={loading ? 'Autenticando usuario' : 'Ingresar al sistema'}
          >
            {loading ? 'AUTENTICANDO...' : 'INGRESAR AL NODO'}
          </button>
        </form>

        <footer className="cyber-footer">
          <p>¿SIN CREDENCIALES? <Link to="/registro" className="neon-link" aria-label="Navegar a la página de registro">REGISTRAR NUEVO AGENTE</Link></p>
        </footer>
      </div>
    </main>
  );
};

export default Login;
