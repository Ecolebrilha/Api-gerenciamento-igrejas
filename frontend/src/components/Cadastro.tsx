import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./mensagem_erro_sucesso.css";
import "./Cadastro.css";

const Cadastro: React.FC = () => {
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const nomeCompleto = formData.get("nomeCompleto") as string;
        const cpf = formData.get("cpf") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const funcao = formData.get("funcao") as string;
    
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nomeCompleto, cpf, email, password, funcao }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setIsError(false);
                setMessage('Usuário cadastrado com sucesso!');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setMessage(`Erro ao cadastrar usuário: ${data.message}`);
                setIsError(true);
            }
        } catch (error) {
            setMessage('Erro ao conectar com o servidor.');
            setIsError(true);
        }
    };

    return (
        <div className="container_cadastro">
            <div className='item1_cadastro'>1</div>
            <div className='item2_cadastro'>
                {message && <div className={`feedback ${isError ? 'error' : ''}`}>{message}</div>}
                <form onSubmit={handleSubmit} className='formulario'>
                    <label htmlFor="name" id='user'>Nome Completo: </label>
                    <input type="text" name="nomeCompleto" placeholder='Insira seu nome completo' required />
                    <label htmlFor="cpf" id='user'>CPF: </label>
                    <input type="text" name="cpf" placeholder='Insira seu cpf' required />
                    <label id='mail' htmlFor="email">Email: </label>
                    <input type="email" name="email" placeholder='Insira seu email' required />
                    <label id='senha' htmlFor="password">Senha: </label>
                    <input type="password" name="password" placeholder='Insira sua senha' required />
                    <label htmlFor="funcao">Função: </label>
                    <select name="funcao" id="function" className='select_funcao'>
                        <option value="funcao1">FUNÇÃO 1</option>
                        <option value="funcao2">FUNÇÃO 2</option>
                        <option value="funcao3">FUNÇÃO 3</option>
                    </select>
                    <button type="submit">CADASTRAR</button>
                </form>
                <Link to='/' className='link_cadastro'>Já possui login?</Link>
            </div>
        </div>
    );
};

export default Cadastro;