import { useCallback, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { buscarMusicas } from '../services/api';
import MusicCard from '../components/musiccard';

export default function Home({ navigation }) {
    const [musicas, setMusicas] = useState([]);

    useFocusEffect(
        useCallback(() => {
            carregarMusicas();
        }, [])
    );

    async function carregarMusicas() {
        try {
            const dados = await buscarMusicas();
            setMusicas(dados);
        } catch (error) {
            console.error('Erro ao carregar músicas:', error);
        }
    }

    function abrirDetalhes(id) {
        navigation.navigate('Details', {
            id: id
        });
    }

    function abrirAdicionar() {
        navigation.navigate('AddMusic');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>SONORA</Text>

            <TouchableOpacity
                style={styles.botao}
                onPress={abrirAdicionar}
            >
                <Text style={styles.textoBotao}>
                    + Adicionar música
                </Text>
            </TouchableOpacity>

            <FlatList
                data={musicas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MusicCard
                        musica={item}
                        onPress={abrirDetalhes}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.vazio}>
                        Nenhuma música cadastrada.
                    </Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20
    },

    botao: {
        backgroundColor: '#6c3cff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20
    },

    textoBotao: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: 'bold'
    },

    vazio: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 16
    }
});