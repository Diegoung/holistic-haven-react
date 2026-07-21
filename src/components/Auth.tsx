import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // 🟢 INICIAR SESIÓN
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) {
        alert('Error al ingresar: ' + error.message);
      } else {
        alert('¡Bienvenido de nuevo!');
        console.log('Usuario autenticado:', data.user);
      }
    } else {
      // 🔵 REGISTRARSE
      // 1. Crear el usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({ 
        email, 
        password 
      });

      if (authError) {
        alert('Error en el registro: ' + authError.message);
        return;
      }

      // 2. Guardar los datos del perfil en la tabla 'perfiles'
      if (authData?.user) {
        const { error: profileError } = await supabase
          .from('perfiles')
          .insert([
            {
              id: authData.user.id, // Vincula con el id de auth.users
              nombre: nombre,
              telefono: telefono,
              rol: 'alumno'
            }
          ]);

        if (profileError) {
          alert('Error al guardar datos del perfil: ' + profileError.message);
        } else {
          alert('¡Registro exitoso! Ya podés iniciar sesión.');
          setIsLogin(true); // Cambia automáticamente a la pantalla de Login
        }
      }
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
        {/* Campos adicionales para el registro */}
        {!isLogin && (
          <>
            <input 
              type="text" 
              placeholder="Nombre y Apellido" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              required 
            />
            <input 
              type="tel" 
              placeholder="Teléfono" 
              value={telefono} 
              onChange={(e) => setTelefono(e.target.value)} 
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </>
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