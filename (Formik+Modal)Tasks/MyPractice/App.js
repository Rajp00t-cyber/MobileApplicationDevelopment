import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

export default function App() {
  // Modal state 
  const [modalVisible, setModalVisible] = useState(false);

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
  });

  return (
    <View style={styles.container}>
      <Button title="Open Form" onPress={() => setModalVisible(true)} />

      {/*  Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Signup Form</Text>

          <Formik
            initialValues={{ name: "", email: "" }}
            validationSchema={validationSchema}
            onSubmit={(data) => {
              console.log(data);
              alert("Form Submitted!");
              setModalVisible(false);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                {/* Name */}
                <Text>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <Text style={styles.error}>{errors.name}</Text>
                )}

                {/* Email */}
                <Text>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                {/* Buttons Rida*/}
                <Button title="Submit" onPress={handleSubmit} />
                <Button
                  title="Close"
                  color="red"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
