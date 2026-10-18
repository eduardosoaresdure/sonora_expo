import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home';
import Details from './screens/details';
import AddMusic from './screens/addmusic';
import EditMusic from './screens/editmusic';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                />

                <Stack.Screen
                    name="Details"
                    component={Details}
                />

                <Stack.Screen
                    name="AddMusic"
                    component={AddMusic}
                />

                <Stack.Screen
                    name="EditMusic"
                    component={EditMusic}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}