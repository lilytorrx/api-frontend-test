import React, { useState, useEffect } from "react";
import { adicionarUsuario, atualizarUsuario } from "../api/usuarios";

interface UsuarioFormProps {
    usuarioEditando?: any;
    aoSalvar: () => void;
    aoCancelar: () => void;
}

const UsuarioForm = ({ usuarioEditando, aoSalvar, aoCancelar }: UsuarioFormProps) => {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState<number>(0);
    const [habilidades, setHabilidades] = useState("");

    useEffect(() => {
        if (usuarioEditando) {
            setNome(usuarioEditando.nome);
            setIdade(usuarioEditando.idade);
            setHabilidades(usuarioEditando.habilidades?.join(", ") || "");
        }
    }, [usuarioEditando]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const usuario = {
            nome,
            idade,
            habilidades: habilidades.split(",").map(h => h.trim()),
            ativo: true,
        };

        try {
            if (usuarioEditando) {
                await atualizarUsuario(usuarioEditando.id, usuario);
            } else {
                await adicionarUsuario(usuario);
            }
            aoSalvar();
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
            alert("Erro ao salvar usuário.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{usuarioEditando ? "Editar Usuário" : "Novo Usuário"}</h3>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Idade"
                value={idade}
                onChange={(e) => setIdade(Number(e.target.value))}
                required
            />
            <input
                type="text"
                placeholder="Habilidades (separadas por vírgula)"
                value={habilidades}
                onChange={(e) => setHabilidades(e.target.value)}
            />
            <button type="submit">Salvar</button>
            <button type="button" onClick={aoCancelar}>Cancelar</button>
        </form>
    );
};

export default UsuarioForm;
