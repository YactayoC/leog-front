import Link from 'next/link';

import { AuthLayout } from 'components';

import stylesAuth from 'styles/Auth.module.css';

const RegisterPage = () => {
  return (
    <AuthLayout title={'Removies Perú: Iniciar Sesión'}>
      <div className={stylesAuth.divForm}>
        <h2>Registrate</h2>
        <form className={stylesAuth.form}>
          <div className={stylesAuth.formGroup}>
            <p>Nombres:</p>
            <input type="text" placeholder="Ingresa tus nombres" />
          </div>
          <div className={stylesAuth.formGroup}>
            <p>Correo:</p>
            <input type="email" placeholder="Ingresa tu email" />
          </div>
          <div className={stylesAuth.formGroup}>
            <p>Contraseña:</p>
            <input type="password" placeholder="Ingresa tu contraseña" />
          </div>
          <button className="btn btn-primary w-100">Iniciar sesión</button>
          <div className={stylesAuth.formGroup}>
            <span>
              ¿Ya tienes una cuenta?
              <Link href="/auth/login">
                <a> Inicia sesión</a>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
