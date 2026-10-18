import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';

import { criarMusica } from '../services/api';

export default function AddMusic({ navigation }) {
    const [titulo, setTitulo] = useState('');
    const [artista, setArtista] = useState('');
    const [album, setAlbum] = useState('');
    const [genero, setGenero] = useState('');
    const [ano, setAno] = useState('');
    const [capa, setCapa] = useState('');

    async function cadastrarMusica() {
        if (!titulo || !artista || !album || !genero || !ano) {
            Alert.alert(
                'Atenção',
                'Preencha todos os campos obrigatórios.'
            );
            return;
        }

        const musica = {
            titulo,
            artista,
            album,
            genero,
            ano: Number(ano),
            capa
        };

        try {
            await criarMusica(musica);

            Alert.alert(
                'Sucesso',
                'Música cadastrada com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack()
                    }
                ]
            );

            setTitulo('');
            setArtista('');
            setAlbum('');
            setGenero('');
            setAno('');
            setCapa('');
        } catch (error) {
            console.error('Erro ao cadastrar música:', error);

            Alert.alert(
                'Erro',
                'Não foi possível cadastrar a música.'
            );
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Adicionar música
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Título"
                value={titulo}
                onChangeText={setTitulo}
            />

            <TextInput
                style={styles.input}
                placeholder="Artista"
                value={artista}
                onChangeText={setArtista}
            />

            <TextInput
                style={styles.input}
                placeholder="Álbum"
                value={album}
                onChangeText={setAlbum}
            />

            <TextInput
                style={styles.input}
                placeholder="Gênero"
                value={genero}
                onChangeText={setGenero}
            />

            <TextInput
                style={styles.input}
                placeholder="Ano"
                value={ano}
                onChangeText={setAno}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="URL da capa (opcional)"
                value={capa}
                onChangeText={setCapa}
            />

            <TouchableOpacity
                style={styles.botao}
                onPress={cadastrarMusica}
            >
                <Text style={styles.textoBotao}>
                    Adicionar música
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25
    },

    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16
    },

    botao: {
        backgroundColor: '#6c3cff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },

    textoBotao: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: 'bold'
    }
});