import Input from "@/components/Input";
import Image from "next/image";
import { useCallback, useState } from "react";
import logo from '../../public/images/logo.png';
/* esto se adiciona después de crear [...nextauth].ts */
import axios from 'axios';
import { signIn } from 'next-auth/react';
/*  */
/* Esto se hace para login/register con Google y Github */
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useRouter } from "next/router";
/*  */

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
  }, []);
  /* esto se adiciona después de crear [...nextauth].ts */
  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });     
      
      router.push('/profiles')
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);
  
  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        name,
        email,
        password
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [name, email, password, login]);
  /*  */

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image 
            src={logo}
            alt="Logo"
            className="h-12 w-auto"
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-12 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
              <Input 
                type="text"
                id="name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                label="Username"
              />    
              )}          
              <Input 
                type="email"
                id="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                label="Email"
              />
              <Input 
                type="password"
                id="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                label="Password"
              />
            </div>
            {/* Este botón cambia ahora que estamos en register/login para adicionar el método onClick */}
            <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            {/*  */}
            {/* Esto se hace para login/register con Google y Github */}
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} />
              </div>
              <div onClick={() => signIn('github', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={30} />
              </div>
            </div>
            {/*  */}
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;