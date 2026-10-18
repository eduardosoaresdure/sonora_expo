import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from 'react-native';

import {
    buscarMusica,
    excluirMusica
} from '../services/api';

export default function Details({ route, navigation }) {
    const { id } = route.params;

    const [musica, setMusica] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarMusica();
    }, []);

    async function carregarMusica() {
        try {
            const dados = await buscarMusica(id);
            setMusica(dados);
        } catch (error) {
            console.error('Erro ao buscar música:', error);
        } finally {
            setCarregando(false);
        }
    }

    function abrirEdicao() {
        navigation.navigate('EditMusic', {
            id: id
        });
    }

    function confirmarExclusao() {
    excluir();
}

    async function excluir() {

        Alert.alert('TESTE', 'A função excluir foi executada!');

        try {
            await excluirMusica(id);

            Alert.alert(
                'Sucesso',
                'Música excluída com sucesso!'
            );

            navigation.navigate('Home');
        } catch (error) {
            console.error(error);

            Alert.alert(
                'Erro',
                'Não foi possível excluir a música.'
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

    if (!musica) {
        return (
            <View style={styles.container}>
                <Text>Música não encontrada.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{musica.titulo}</Text>

            <Text style={styles.label}>Artista</Text>
            <Text style={styles.valor}>{musica.artista}</Text>

            <Text style={styles.label}>Álbum</Text>
            <Text style={styles.valor}>{musica.album}</Text>

            <Text style={styles.label}>Gênero</Text>
            <Text style={styles.valor}>{musica.genero}</Text>

            <Text style={styles.label}>Ano</Text>
            <Text style={styles.valor}>{musica.ano}</Text>

            <Text style={styles.label}>Capa</Text>
            <Text style={styles.valor}>
                {musica.capa || 'Nenhuma capa cadastrada'}
            </Text>

            <TouchableOpacity
                style={styles.botaoEditar}
                onPress={abrirEdicao}
            >
                <Text style={styles.textoBotao}>
                    Editar música
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={confirmarExclusao}
            >
                <Text style={styles.textoBotao}>
                    Excluir música
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

    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 15,
        color: '#666666'
    },

    valor: {
        fontSize: 18,
        marginTop: 5
    },

    botaoEditar: {
        backgroundColor: '#6c3cff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30
    },

    botaoExcluir: {
        backgroundColor: '#cc3333',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12
    },

    textoBotao: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: 'bold'
    }
});