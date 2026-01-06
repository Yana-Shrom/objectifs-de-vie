import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Alert, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import Button from './components/button';
import BigTitle from './components/Titles/bigTitle';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Item from './components/item';
import ItemsList from './components/items-list';

const initialGoals = [
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
  const [goals, setGoals] = useState(initialGoals);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoalText, setNewGoalText] = useState('');

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => {
    setShowAddModal(false);
    setNewGoalText('');
  };

  const confirmAddGoal = () => {
    const trimmed = newGoalText.trim();
    if (!trimmed) {
      Alert.alert('Texte vide', 'Veuillez entrer un objectif.');
      return;
    }
    setGoals(prev => [trimmed, ...prev]);
    setSelectedIndex(0);
    closeAddModal();
  };

  const editGoal = () => {
    if (selectedIndex === null) {
      Alert.alert("Aucun objectif sélectionné", "Veuillez sélectionner un objectif à modifier.");
      return;
    }
    setGoals(prev => prev.map((g, idx) => idx === selectedIndex ? `${g} (modifié)` : g));
  }

  const removeGoal = () => {
    if (selectedIndex === null) {
      Alert.alert("Aucun objectif sélectionné", "Veuillez sélectionner un objectif à supprimer.");
      return;
    }
    setGoals(prev => prev.filter((_, idx) => idx !== selectedIndex));
    setSelectedIndex(null);
  }

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <BigTitle value="Objectifs de vie" />
          <View style={styles.Maincontainer}>
            <ItemsList data={goals} selectedIndex={selectedIndex} onSelectItem={setSelectedIndex} />

            <Modal
              visible={showAddModal}
              animationType="slide"
              transparent={true}
              onRequestClose={closeAddModal}
            >
              <View style={styles.modalOverlay}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Nouveau objectif</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Tapez l'objectif..."
                    value={newGoalText}
                    onChangeText={setNewGoalText}
                    autoFocus
                  />
                  <View style={styles.modalButtons}>
                    <Button value="Annuler" onPress={closeAddModal} style={{marginRight:10}} />
                    <Button value="Ajouter" onPress={confirmAddGoal} />
                  </View>
                </KeyboardAvoidingView>
              </View>
            </Modal>

            <View style={styles.buttonContainer2}>
              <Button style={styles.fullWidthButton} value="Add" onPress={openAddModal} />
            </View>
            <View style={styles.buttonContainer}>
              <Button style={styles.smallButton} value="Edit" onPress={editGoal} />
              <Button style={styles.smallButton} value="Supp" onPress={removeGoal} />
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});
