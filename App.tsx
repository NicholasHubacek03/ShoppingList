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

  const handleSubmit = (): void => {
    if(value.trim())
    setToShops([...toDoShop, {text : value, completed: false}]);
  else showError(true);
  setValue("");
  };
  
  const removeItem = (index: number): void => {
    const newToShopList = [...toDoShop];
    newToShopList.splice(index, 1);
    setToShops(newToShopList);
  }

  const toggleComplete = (index: number): void => {
    const newToShopList = [...toDoShop];
    newToShopList[index].completed = !newToShopList[index].completed
    setToShops(newToShopList)
  }

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
                    {toDoShop.length === 0 && <Text>No Groceries</Text>}
                      {toDoShop.map((toDo: ItoShop, index: number) => (
                        <View key={`${index}_${toDo.text}`}>
                          {/* <Text
                          style={[
                            styles.
                            { textDecorationLine: toDo.completed ? "line-through" : "none" }
                          ]}>
                          {toDo.text}
                        </Text> */}
                        <Button
                          title={toDo.completed ? "Completed" : "Complete"}
                          onPress={() => { /* Implement complete grocery logic */ }}
                        />
                        <Button title="X" onPress={() => { /* Implement delete grocery logic */ }} color="crimson" />
                      </View>
                    ))}
                  </ImageBackground>
                  <StatusBar style="auto" />
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
      paddingTop: 50,
      alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
