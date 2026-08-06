import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) {
        alert('Error al ingresar: ' + error.message);
      } else {
        alert('¡Bienvenido de nuevo!');
      }
    } else {
      // REGISTRO - Enviamos el nombre y apellido en los metadatos
      const nombreLimpio = nombre.trim();

      const { error: authError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            nombre: nombreLimpio
          }
        }
      });

      if (authError) {
        alert('Error en el registro: ' + authError.message);
        return;
      }

      alert('¡Registro exitoso! Ya podés iniciar sesión.');
      setIsLogin(true);
      setNombre('');
    }
  };

  return (
    <div style={{ 
      maxWidth: '350px', 
      margin: '50px auto', 
      padding: '30px', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#fff' 
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>
        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
      </h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input 
            type="text" 
            placeholder="Nombre y Apellido" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required 
          />
        )}

        <input 
          type="email" 
          placeholder="Tu Correo Electrónico" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          required 
        />
        <input 
          type="password" 
          placeholder="Tu Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          required 
        />

        <button 
          type="submit" 
          style={{ width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}
        >
          {isLogin ? 'Ingresar' : 'Crear Cuenta'}
        </button>
      </form>

      <p 
        onClick={() => setIsLogin(!isLogin)} 
        style={{ textAlign: 'center', cursor: 'pointer', marginTop: '15px', color: '#0066cc', fontSize: '14px' }}
      >
        {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Ingresa aquí'}
      </p>
    </div>
  );
};