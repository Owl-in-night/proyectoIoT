import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../components/_partials/Alert';
import '../App.css';

function SignUp() {
  const [user, setUser] = useState({ email: '', password: '' });
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Verificar si el correo electrónico tiene el dominio permitido
      if (!user.email.endsWith('@uvg.edu.gt')) {
        throw new Error('Solo se permite el registro con correos de @uvg.edu.gt');
      }

      // Registrar usuario con correo y contraseña
      await signup(user.email, user.password);
      navigate('/app');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex-1 p-1">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Sign Up</h1>
        </div>
        {error && <Alert message={error} />}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="youremail@uvg.edu.gt"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="******"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-600">
            Do you have an account?{' '}
            <Link to="/" className="text-blue-500 hover:text-blue-800">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
