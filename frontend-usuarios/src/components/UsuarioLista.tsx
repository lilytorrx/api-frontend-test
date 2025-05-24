import React, { useEffect, useState } from "react";
import { listarUsuarios, deletarUsuario } from "../api/usuarios";
import UsuarioForm from "./UsuarioForm";

const UsuarioLista = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [editando, setEditando] = useState<any | null>(null);
    const [mostrarForm, setMostrarForm] = useState(false);

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        const response = await listarUsuarios();
        setUsuarios(response.data.content);
    };

    const handleExcluir = async (id: string) => {
        try {
            await deletarUsuario(id);
            carregarUsuarios();
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao excluir o usuário.");
        }
    };

    const handleEditar = (usuario: any) => {
        setEditando(usuario);
        setMostrarForm(true);
    };

    const handleNovoUsuario = () => {
        setEditando(null);
        setMostrarForm(true);
    };

    const handleSalvar = () => {
        setMostrarForm(false);
        carregarUsuarios();
    };

    const handleCancelar = () => {
        setMostrarForm(false);
    };

    return (
        <div>
            <h2>Lista de Usuários</h2>
            <button onClick={handleNovoUsuario}>Novo Usuário</button>

            {mostrarForm && (
                <UsuarioForm
                    usuarioEditando={editando}
                    aoSalvar={handleSalvar}
                    aoCancelar={handleCancelar}
                />
            )}

            <ul>
                {usuarios.map((usuario: any) => (
                    <li key={usuario.id}>
                        {usuario.nome} - {usuario.idade} anos
                        <button onClick={() => handleEditar(usuario)}>Editar</button>
                        <button onClick={() => handleExcluir(usuario.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsuarioLista;
