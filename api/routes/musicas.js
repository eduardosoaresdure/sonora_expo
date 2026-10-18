const express = require('express');
const router = express.Router();

const connection = require('../database/connection');

// CREATE - Cadastrar uma música
router.post('/musicas', (req, res) => {
    const { titulo, artista, album, genero, ano, capa } = req.body;

    const sql = `
        INSERT INTO musicas (titulo, artista, album, genero, ano, capa)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [titulo, artista, album, genero, ano, capa];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Erro ao cadastrar música:', error);
            return res.status(500).json({
                erro: 'Erro ao cadastrar música'
            });
        }

        res.status(201).json({
            mensagem: 'Música cadastrada com sucesso!',
            id: results.insertId
        });
    });
});

// READ - Listar todas as músicas
router.get('/musicas', (req, res) => {
    const sql = 'SELECT * FROM musicas';

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Erro ao buscar músicas:', error);
            return res.status(500).json({
                erro: 'Erro ao buscar músicas'
            });
        }

        res.json(results);
    });
});

// READ - Buscar uma música específica
router.get('/musicas/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM musicas WHERE id = ?';

    connection.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Erro ao buscar música:', error);
            return res.status(500).json({
                erro: 'Erro ao buscar música'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                erro: 'Música não encontrada'
            });
        }

        res.json(results[0]);
    });
});

// UPDATE - Editar uma música
router.put('/musicas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, artista, album, genero, ano, capa } = req.body;

    const sql = `
        UPDATE musicas
        SET titulo = ?, artista = ?, album = ?, genero = ?, ano = ?, capa = ?
        WHERE id = ?
    `;

    const values = [titulo, artista, album, genero, ano, capa, id];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Erro ao editar música:', error);
            return res.status(500).json({
                erro: 'Erro ao editar música'
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                erro: 'Música não encontrada'
            });
        }

        res.json({
            mensagem: 'Música atualizada com sucesso!'
        });
    });
});

// DELETE - Excluir uma música
router.delete('/musicas/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM musicas WHERE id = ?';

    connection.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Erro ao excluir música:', error);
            return res.status(500).json({
                erro: 'Erro ao excluir música'
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                erro: 'Música não encontrada'
            });
        }

        res.json({
            mensagem: 'Música excluída com sucesso!'
        });
    });
});

module.exports = router;