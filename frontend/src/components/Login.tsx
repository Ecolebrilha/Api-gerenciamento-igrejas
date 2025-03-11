import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import './mensagem_erro_sucesso.css';

const Login: React.FC = () => {
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsError(false);
                setMessage('Sucesso! Usuário logado.');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            } else {
                setMessage(`Erro no login: ${data.message}`);
                setIsError(true);
            }
        } catch (error) {
            setMessage('Erro no login: Não foi possível conectar ao servidor.');
            setIsError(true);
        }
    };

    return (
        <div className="container">
            <div className='item1-login'></div>
            <div className='item2-login'>
                {message && <div className={`feedback ${isError ? 'error' : ''}`}>{message}</div>}
                <form onSubmit={handleSubmit} className='formulario'>
                    <label id='name' htmlFor="name">Email: </label>
                    <input type="text" name="email" placeholder='Insira seu email' required />
                    <label id='senha' htmlFor="password">Senha: </label>
                    <input id='password' name="password" type="password" placeholder='Insira sua senha' required />
                    <button type="submit">LOGIN</button>
                </form>
                <Link to='/cadastro_usuario' className='link_cadastro'>Cadastre-se</Link>
            </div>
        </div>
    );
};

export default Login;