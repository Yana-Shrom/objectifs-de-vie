import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, ImageBackground, Alert, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import Button from './components/button';
import BigTitle from './components/Titles/bigTitle';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import ItemsList from './components/items-list';

const initialGoals = [
  { id: 1, goal: "Faire les courses", done: false, parentId: null },
  { id: 2, goal: "Aller à la salle de sport 3 fois par semaine", done: false, parentId: null },
  { id: 3, goal: "Monter à plus de 5000m d altitude", done: false, parentId: null },
  { id: 4, goal: "Acheter mon premier appartement", done: false, parentId: null },
  { id: 5, goal: "Perdre 5 kgs", done: false, parentId: null },
  { id: 6, goal: "Gagner en productivité", done: false, parentId: null },
  { id: 7, goal: "Apprendre un nouveau langage", done: false, parentId: null },
  { id: 8, goal: "Faire une mission en freelance", done: false, parentId: null },
  { id: 9, goal: "Organiser un meetup autour de la tech", done: false, parentId: null },
  { id: 10, goal: "Faire un triathlon", done: false, parentId: null }
];

export default function button() {
  const [goals, setGoals] = useState(initialGoals);
  const [selectedId, setSelectedId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [newGoalText, setNewGoalText] = useState('');
  const [addAsChild, setAddAsChild] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const openAddModal = (asChild = false) => {
    setAddAsChild(asChild);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewGoalText('');
    setAddAsChild(false);
  };
  const closeAddEditModal = () => {
    setShowAddEditModal(false);
    setNewGoalText('');
    setEditingId(null);
  };

  const generateId = () => Date.now();

  const getChildren = (id, list) => list.filter(g => g.parentId === id);
  const getDescendants = (id, list) => {
    const children = getChildren(id, list);
    return children.reduce((acc, child) => acc.concat(child, getDescendants(child.id, list)), []);
  };

  const updateParentStatusOnChildChange = (childId, list) => {
    const child = list.find(g => g.id === childId);
    if (!child || child.parentId == null) return list;
    const parentId = child.parentId;
    const parent = list.find(g => g.id === parentId);
    if (!parent) return list;
    const siblings = list.filter(g => g.parentId === parentId);
    const allSiblingsDone = siblings.length > 0 && siblings.every(s => s.done === true);
    const updated = list.map(g => g.id === parentId ? { ...g, done: allSiblingsDone } : g);
    return updateParentStatusOnChildChange(parentId, updated);
  };

  const confirmAddGoal = () => {
    const trimmed = newGoalText.trim();
    if (!trimmed) {
      Alert.alert('Texte vide', 'Veuillez entrer un objectif.');
      return;
    }
    if (showAddEditModal && editingId !== null) {
      setGoals(prev => prev.map(g => g.id === editingId ? { ...g, goal: trimmed } : g));
      closeAddEditModal();
    } else {
      const id = generateId();
      const parentId = addAsChild && selectedId ? selectedId : null;
      const newGoal = { id, goal: trimmed, done: false, parentId };
      setGoals(prev => [newGoal, ...prev]);
      setSelectedId(id);
      closeAddModal();
    }
  };

  const editGoal = () => {
    if (selectedId === null) {
      Alert.alert("Aucun objectif sélectionné", "Veuillez sélectionner un objectif à modifier.");
      return;
    }
    const g = goals.find(x => x.id === selectedId);
    if (!g) return;
    setNewGoalText(g.goal);
    setEditingId(selectedId);
    setShowAddEditModal(true);
  };

  const toggleDone = (id, value) => {
    setGoals(prev => {
      let updated = prev.slice();
      const goal = updated.find(g => g.id === id);
      if (!goal) return prev;

      const descendants = getDescendants(id, updated);
      if (descendants.length > 0) {
        updated = updated.map(g => g.id === id ? { ...g, done: value } : g);
        const descendantIds = descendants.map(d => d.id);
        updated = updated.map(g => descendantIds.includes(g.id) ? { ...g, done: value } : g);
      } else {
        updated = updated.map(g => g.id === id ? { ...g, done: value } : g);
        updated = updateParentStatusOnChildChange(id, updated);
      }

      
      if (!descendants.length) {
        updated = updateParentStatusOnChildChange(id, updated);
      } else if (!value) {
        
        const parentId = updated.find(g => g.id === id)?.parentId;
        if (parentId) {
          updated = updated.map(g => g.id === parentId ? { ...g, done: false } : g);
          updated = updateParentStatusOnChildChange(parentId, updated);
        }
      }

      return updated;
    });
  };

  const activeTopLevel = goals.filter(g => g.parentId === null && !g.done).map(g => g.id);
  const doneTopLevel = goals.filter(g => g.parentId === null && g.done).map(g => g.id);

  const gatherSectionGoals = (topIds) => {
    const ids = new Set();
    const addWithDesc = (id) => {
      ids.add(id);
      const desc = getDescendants(id, goals);
      desc.forEach(d => ids.add(d.id));
    };
    topIds.forEach(addWithDesc);
    return goals.filter(g => ids.has(g.id));
  };

  const activeSectionGoals = gatherSectionGoals(activeTopLevel);
  const doneSectionGoals = gatherSectionGoals(doneTopLevel);

  const removeGoal = () => {
    if (selectedId === null) {
      Alert.alert("Aucun objectif sélectionné", "Veuillez sélectionner un objectif à supprimer.");
      return;
    }
    setGoals(prev => {
      const descendants = getDescendants(selectedId, prev);
      const idsToRemove = [selectedId, ...descendants.map(d => d.id)];
      return prev.filter(g => !idsToRemove.includes(g.id));
    });
    setSelectedId(null);
  }
  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <BigTitle value="Objectifs de vie" />
          <View style={styles.Maincontainer}>
            <ItemsList goals={activeSectionGoals} selectedId={selectedId} onSelectItem={setSelectedId} onToggleItem={toggleDone} />

            {doneSectionGoals.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Complétés</Text>
                <ItemsList goals={doneSectionGoals} selectedId={null} onSelectItem={() => {}} onToggleItem={toggleDone} />
              </>
            )}
            <Modal
              visible={showAddEditModal}
              animationType="slide"
              transparent={true}
              onRequestClose={closeAddEditModal}
            >
              <View style={styles.modalOverlay}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Modification</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Tapez l'objectif..."
                    value={newGoalText}
                    onChangeText={setNewGoalText}
                    autoFocus
                  />
                  <View style={styles.modalButtons}>
                    <Button value="Annuler" onPress={closeAddEditModal} style={{marginRight:10}} />
                    <Button value="Modifier" onPress={confirmAddGoal} />
                  </View>
                </KeyboardAvoidingView>
              </View>
            </Modal>

            <Modal
              visible={showAddModal}
              animationType="slide"
              transparent={true}
              onRequestClose={closeAddModal}
            >
              <View style={styles.modalOverlay}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Nouveau objectif</Text>
                  {addAsChild && selectedId && (
                    <Text style={{marginBottom:8}}>Sous-objectif de: {goals.find(g => g.id === selectedId)?.goal}</Text>
                  )}
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

            <View style={styles.addRow}>
              <Button style={styles.fullWidthButtonRow} value="Add" onPress={() => openAddModal(false)} />
              <Button style={styles.addSubButton} value="Add Sub" onPress={() => openAddModal(true)} disable={!selectedId} />
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
  fullWidthButtonRow:{
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    marginRight: 10
  },
  addSubButton: {
    width: 100,
    paddingVertical: 14,
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
  addRow:{
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
    width: '90%',
    flexDirection: 'row'
  },
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
  },
  sectionTitle: {
    width: '100%',
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginTop: 12,
    marginBottom: 6,
  }
});
