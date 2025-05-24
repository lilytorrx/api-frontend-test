import axios from "axios";

const API_BASE = "http://localhost:8080/api/usuarios";

export const listarUsuarios = (nome = "", page = 0, size = 5) => {
    return axios.get(`${API_BASE}/search`, {
        params: { nome, page, size },
    });
};

export const adicionarUsuario = (usuario: any) => {
    return axios.post(`${API_BASE}`, usuario);
}

export const atualizarUsuario = (id: string, usuario: any) => {
    return axios.put(`${API_BASE}/${id}`, usuario);
}

export const deletarUsuario = (id: string) => {
    return axios.delete(`${API_BASE}/${id}`);
}