import AuthForm from '@/components/auth/authForm.component';
import { hasCookie } from '@/components/auth/cookieManager';

export const Auth = async () => {
  return (
    <>
      {await hasCookie('token')}
      <main className="flex min-h-screen flex-col items-center justify-start p-24">
        <AuthForm></AuthForm>
      </main>
    </>
  );
};

export default Auth;
