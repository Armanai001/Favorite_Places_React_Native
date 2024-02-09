import {StatusBar} from 'expo-status-bar';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {useEffect, useState} from "react";
import * as SplashScreen from 'expo-splash-screen';

import AllPlaces from "./src/screen/AllPlaces";
import AddPlace from "./src/screen/AddPlace";
import IconButton from "./src/components/Ui/IconButton";
import {colors} from "./src/constants/colors";
import MapScreen from "./src/screen/MapScreen";
import {init} from "./src/store/database";
import PlaceDetails from "./src/screen/PlaceDetails";
import EditPlace from "./src/screen/EditPlace";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
export default function App() {
    const [_, setDbInitialized] = useState(false)

    useEffect(() => {
        init.then(async () => {
            setDbInitialized(true)
            await SplashScreen.hideAsync();
        }).catch((_) => {

        });
    }, [])

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

                    <Stack.Screen name="Detail"
                                  component={PlaceDetails}
                    />

                    <Stack.Screen name="Edit Place"
                                  component={EditPlace}
                    />

                </Stack.Navigator>

            </NavigationContainer>

        </>
    );
}