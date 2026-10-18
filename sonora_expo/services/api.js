const API_URL = 'http://localhost:3000';

export async function buscarMusicas() {
    const response = await fetch(`${API_URL}/musicas`);

    if (!response.ok) {
        throw new Error('Erro ao buscar músicas');
    }

    return await response.json();
}

export async function buscarMusica(id) {
    const response = await fetch(`${API_URL}/musicas/${id}`);

    if (!response.ok) {
        throw new Error('Erro ao buscar música');
    }

    return await response.json();
}

export async function criarMusica(musica) {
    const response = await fetch(`${API_URL}/musicas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(musica)
    });

    if (!response.ok) {
        throw new Error('Erro ao criar música');
    }

    return await response.json();
}

export async function atualizarMusica(id, musica) {
    const response = await fetch(`${API_URL}/musicas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(musica)
    });

    if (!response.ok) {
        throw new Error('Erro ao atualizar música');
    }

    return await response.json();
}

export async function excluirMusica(id) {
    const response = await fetch(`${API_URL}/musicas/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Erro ao excluir música');
    }

    return await response.json();
}