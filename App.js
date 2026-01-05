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
            <View style={styles.buttonContainer2}>
              <Button style={styles.fullWidthButton} value="Add1" />
            </View>
            <View style={styles.buttonContainer}>
              <Button style={styles.smallButton} value="Add2" />
              <Button style={styles.smallButton} value="Edit" />
              <Button style={styles.smallButton} value="Supp" />
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
  fullWidthButton:{
    width: '95%',
    paddingVertical: 16,
    borderRadius: 12,
  },
  smallButton:{
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
  ,
  buttonContainer2:{
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
    width: '100%'
  }
});
