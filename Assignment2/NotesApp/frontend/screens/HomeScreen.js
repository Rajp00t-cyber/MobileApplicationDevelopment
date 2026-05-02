import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, Modal, ActivityIndicator,
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../constants/firebaseConfig';
import styles from '../styles/globalStyling';

export default function HomeScreen({ navigation }) {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    setFetching(true);
    try {
      const docRef = doc(db, 'notes', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSavedNote(docSnap.data().note);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not fetch note');
    } finally {
      setFetching(false);
    }
  };

  const handleSave = async () => {
    if (!note.trim()) return Alert.alert('Error', 'Please enter a note first');
    setLoading(true);
    try {
      await setDoc(doc(db, 'notes', user.uid), {
        note: note.trim(),
        updatedAt: new Date().toISOString(),
      });
      setSavedNote(note.trim());
      setNote('');
      setModalMessage('✅ Note saved to Firebase successfully!');
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Save Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'notes', user.uid));
      setSavedNote('');
      setDeleteModalVisible(false);
      setModalMessage('🗑️ Note deleted successfully!');
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Delete Error', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🏠 Home</Text>
        <Text style={styles.emailText}>Logged in as:</Text>
        <Text style={styles.emailValue}>{user?.email}</Text>

        {/* Add Note Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📝 Add a Note</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your note..."
            placeholderTextColor="#aaa"
            value={note}
            onChangeText={setNote}
            multiline
          />
          {loading ? (
            <ActivityIndicator size="large" color="#4F8EF7" />
          ) : (
            <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
              <Text style={styles.buttonText}>💾 Save to Firebase</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Saved Note Card */}
        {fetching ? (
          <ActivityIndicator size="small" color="#4F8EF7" style={{ marginBottom: 20 }} />
        ) : savedNote !== '' ? (
          <View style={styles.savedCard}>
            <Text style={styles.cardTitle}>📌 Saved Note</Text>
            <Text style={styles.savedText}>{savedNote}</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => setDeleteModalVisible(true)}
            >
              <Text style={styles.buttonText}>🗑️ Delete Note</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No saved note yet.</Text>
          </View>
        )}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>🚪 Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ✅ Success / Info Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Firebase</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🗑️ Delete Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Delete Note</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete your saved note? This cannot be undone.
            </Text>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.buttonText}>Yes, Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonPrimary, { marginBottom: 0 }]}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}
