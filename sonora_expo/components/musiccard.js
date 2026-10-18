import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MusicCard({ musica, onPress }) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onPress(musica.id)}
        >
            <Text style={styles.titulo}>{musica.titulo}</Text>
            <Text style={styles.artista}>{musica.artista}</Text>
            <Text>{musica.album}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#eeeeee',
    },

    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    artista: {
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5,
    },
});