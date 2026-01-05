import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground} from 'react-native';
import Button from './components/button';
import BigTitle from './components/Titles/bigTitle';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Item from './components/item';
import ItemsList from './components/items-list';

const sampleGoals = [
  "Faire les courses",

  "Aller à la salle de sport 3 fois par semaine",

  "Monter à plus de 5000m d altitude",

  "Acheter mon premier appartement",

  "Perdre 5 kgs",

  "Gagner en productivité",

  "Apprendre un nouveau langage",

  "Faire une mission en freelance",

  "Organiser un meetup autour de la tech",

  "Faire un triathlon",
];

export default function button() {
  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <BigTitle value="Objectifs de vie" />
          <View style={styles.Maincontainer}>
            <ItemsList data={sampleGoals} />
            <View style={styles.buttonContainer}>
              <Button style={styles.button} value="Add" />
              <Button style={styles.button} value="Edit" />
              <Button style={styles.button} value="Supp" />
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
  },
  background: {
    flex: 1,
  },
  Maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  button:{
    
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});
