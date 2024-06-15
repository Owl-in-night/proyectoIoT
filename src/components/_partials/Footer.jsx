import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const { pathname } = useLocation();

  // Ocultar el footer en la página de dashboard
  if (pathname === '/dashboard') return null;

  return (
    <footer className='bg-[#F0F4F9] rounded-lg m-4 my-0 dark:bg-slate-800 border-gray-200 fixed bottom-0 left-0 right-0'>
      <div className='w-full mx-auto max-w-screen-xl p-4 text-center'>
        <span className='text-sm text-gray-500 dark:text-gray-400'>© 2024 <Link to='/' className='hover:underline'>Electronic Lock™</Link>. All Rights Reserved.</span>
        <ul className='flex flex-wrap justify-center items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          <li>
            <Link className='mr-4 hover:underline md:mr-6' to='/sobre-nosotros'>Acerca de</Link>
          </li>
          <li>
            <a href='#' className='mr-4 hover:underline md:mr-6'>Política de Privacidad</a>
          </li>
          <li>
            <a href='#' className='mr-4 hover:underline md:mr-6'>Licencia</a>
          </li>
          <li>
            <a href='#' className='hover:underline'>Contacto</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
