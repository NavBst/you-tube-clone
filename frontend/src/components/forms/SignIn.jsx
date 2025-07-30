import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/authSlice';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
    
    // Redirect if user is already logged in
    if (user) {
      navigate('/');
    }
  }, [dispatch, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate('/');
    } catch (err) {
      // Error is handled by Redux
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          {/* YouTube Logo */}
          <svg height="24" viewBox="0 0 120 24" className="w-28 mx-auto">
            <path
              fill="#FF0000"
              d="M20.6,12L20.6,12c0,5.8-4.7,10.5-10.5,10.5S-0.4,17.8-0.4,12l0,0c0-5.8,4.7-10.5,10.5-10.5 S20.6,6.2,20.6,12"
            />
            <path
              fill="#FFFFFF"
              d="M8.3,16.7V7.3L14,12L8.3,16.7z"
            />
            <path
              fill="#282828"
              d="M34.2,18.6v-0.7c-0.6,0.5-1.7,1-3.2,1c-2.2,0-3.4-1.5-3.4-3.4c0-2.5,1.9-3.5,4-3.5 c1,0,1.9,0.2,2.6,0.5v-0.5c0-1.2-0.8-1.9-2.2-1.9c-1.1,0-2,0.3-2.9,0.8l-0.8-1.7c1.2-0.7,2.5-1,3.9-1c2.4,0,4,1.2,4,3.8v6.6H34.2z M34.2,14.7c-0.6-0.3-1.4-0.5-2.2-0.5c-1.3,0-2.1,0.6-2.1,1.6c0,1,0.7,1.5,1.7,1.5c1.1,0,2-0.5,2.5-1V14.7z M41.5,18.6V7.3h2v11.3 H41.5z M41.4,4.9V2.8h2.2v2.1H41.4z M47.6,18.6V7.3h2v1.7c0.6-1.2,1.6-2,3.1-1.9v1.9c-2-0.1-3.1,0.7-3.1,2.7v6.9H47.6z M54.4,15.9 v-7h-1.7V7.3h1.7V4.6h2v2.7h2.1v1.6h-2.1v6.4c0,0.8,0.3,1.2,1.1,1.2c0.3,0,0.7-0.1,0.9-0.2v1.7c-0.4,0.2-1,0.3-1.5,0.3 C55.3,18.3,54.4,17.4,54.4,15.9 M61.3,15.9v-7h-1.7V7.3h1.7V4.6h2v2.7h2.1v1.6h-2.1v6.4c0,0.8,0.3,1.2,1.1,1.2 c0.3,0,0.7-0.1,0.9-0.2v1.7c-0.4,0.2-1,0.3-1.5,0.3C62.2,18.3,61.3,17.4,61.3,15.9 M68.1,18.6V2.8h7.8v2h-5.7v4.8h5.3v1.9h-5.3v7.1 H68.1z M77.9,18.6V7.3h2v1.2c0.8-0.9,1.8-1.4,3-1.4c2.4,0,3.7,1.6,3.7,4.1v7.5h-2v-7c0-1.6-0.8-2.5-2.2-2.5c-1.2,0-2.2,0.7-2.5,1.7 v7.9H77.9z M89,15.9v-7h-1.7V7.3H89V4.6h2v2.7h2.1v1.6h-2.1v6.4c0,0.8,0.3,1.2,1.1,1.2c0.3,0,0.7-0.1,0.9-0.2v1.7 c-0.4,0.2-1,0.3-1.5,0.3C89.9,18.3,89,17.4,89,15.9 M95.1,4.9V2.8h2.2v2.1H95.1z M95.2,18.6V7.3h2v11.3H95.2z M99.7,18.6V2.8h2 v15.8H99.7z M108.9,18.8c-3.2,0-5.4-2.4-5.4-5.9c0-3.4,2.2-5.9,5.4-5.9s5.4,2.4,5.4,5.9C114.3,16.4,112.1,18.8,108.9,18.8z M108.9,17c2.1,0,3.3-1.7,3.3-4.1c0-2.4-1.2-4.1-3.3-4.1s-3.3,1.7-3.3,4.1C105.6,15.3,106.8,17,108.9,17z"
            />
          </svg>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            to continue to YouTube
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-[#065fd4] hover:bg-[#1a73e8] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a73e8] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/register"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create account
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-500 text-center">
          By continuing, you agree to YouTube's{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Terms of Service
          </a>{' '}
          and acknowledge that you have read our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignIn;
