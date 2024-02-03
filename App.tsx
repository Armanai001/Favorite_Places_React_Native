import {StatusBar} from 'expo-status-bar';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";

import AllPlaces from "./src/screen/AllPlaces";
import AddPlace from "./src/screen/AddPlace";
import IconButton from "./src/components/Ui/IconButton";
import {colors} from "./src/constants/colors";
import MapScreen from "./src/screen/MapScreen";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <>
            <StatusBar style='dark'/>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle: {backgroundColor: colors.primary500},
                    headerTintColor: colors.gray700,
                    contentStyle: {backgroundColor: colors.gray700}
                }}>
                    <Stack.Screen name="AllPlaces"
                                  component={AllPlaces}
                                  options={({navigation}) => ({
                                      headerRight: ({tintColor}) => (
                                          <IconButton name="add"
                                                      color={tintColor || 'white'}
                                                      size={24}
                                                      onPress={() => navigation.navigate('AddPlace')}
                                          />
                                      ),
                                      title: "Favourite Places"
                                  })}
                    />

                    <Stack.Screen name="AddPlace"
                                  component={AddPlace}
                                  options={{
                                      title: "Add New Place"
                                  }}
                    />

                    <Stack.Screen name="Map"
                                  component={MapScreen}
                    />


                </Stack.Navigator>

            </NavigationContainer>

        </>
    );
}