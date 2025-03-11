import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro_usuario" element={<Cadastro />} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Routes>
    );
};

export default App;