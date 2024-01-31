import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';

interface ItoShop{
  text: string;
  completed: boolean;
}

export default function App() {

  const [value, setValue] = useState<string>("");
  const [toDoShop, setToShops] = useState<ItoShop[]>([]);
  const [error, showError] = useState<boolean>(false);
  
  return (
    <View style={styles.container}>
      <ImageBackground 
          source={require('./images/grocey-background.jpg')}
            style={styles.imageBackground}
                                          >
            <View style={styles.titleContainer}>
              <Text style={styles.text}>Shopping List</Text>
                  <TextInput 
                    placeholder='Enter shopping items'
                      value=''
                        onChange={e => {}}
                                          />
          <Button title='add Grocery' onPress={() => {}}/>
            </View>
              {error && <Text>Error: Input field is empty...</Text>}
              <Text>Your Shopping List :</Text>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',

  },
    titleContainer: {
      paddingTop: 50, // Adjust the paddingTop to move the title down from the top
      alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
