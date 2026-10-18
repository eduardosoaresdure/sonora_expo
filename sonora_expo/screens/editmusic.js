import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator
} from 'react-native';

import { buscarMusica, atualizarMusica } from '../services/api';

export default function EditMusic({ route, navigation }) {
    const { id } = route.params;

    const [titulo, setTitulo] = useState('');
    const [artista, setArtista] = useState('');
    const [album, setAlbum] = useState('');
    const [genero, setGenero] = useState('');
    const [ano, setAno] = useState('');
    const [capa, setCapa] = useState('');

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarMusica();
    }, []);

    async function carregarMusica() {
        try {
            const dados = await buscarMusica(id);

            setTitulo(dados.titulo);
            setArtista(dados.artista);
            setAlbum(dados.album);
            setGenero(dados.genero);
            setAno(dados.ano.toString());
            setCapa(dados.capa || '');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível carregar a música.');
        } finally {
            setCarregando(false);
        }
    }

    async function salvarAlteracoes() {
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
            await atualizarMusica(id, musica);

            Alert.alert(
                'Sucesso',
                'Música atualizada com sucesso!'
            );

            navigation.goBack();
        } catch (error) {
            console.error(error);

            Alert.alert(
                'Erro',
                'Não foi possível atualizar a música.'
            );
        }
    }

    if (carregando) {
        return (
            <View style={styles.carregando}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Editar música</Text>

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
                placeholder="URL da capa"
                value={capa}
                onChangeText={setCapa}
            />

            <TouchableOpacity
                style={styles.botao}
                onPress={salvarAlteracoes}
            >
                <Text style={styles.textoBotao}>
                    Salvar alterações
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

    carregando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    titulo: {
        fontSize: 30,
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