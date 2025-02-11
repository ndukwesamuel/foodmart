import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // For edit & check icons

const ManageCards = () => {
  const [cards, setCards] = useState([
    {
      id: "1",
      type: "Visa",
      number: "**** **** **** 9876",
      expiry: "11/28",
      selected: false,
    },
    {
      id: "2",
      type: "Visa",
      number: "**** **** **** 9876",
      expiry: "11/28",
      selected: false,
    },
    {
      id: "3",
      type: "Visa",
      number: "**** **** **** 9876",
      expiry: "11/28",
      selected: false,
    },
  ]);

  const [newCard, setNewCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    saveInfo: false,
  });

  const toggleSelect = (id) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, selected: !card.selected } : card
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Manage Cards</Text>

      {/* Saved Cards */}
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => toggleSelect(item.id)}
              style={styles.checkbox}
            >
              {item.selected && (
                <Feather name="check-square" size={20} color="#f90" />
              )}
              {!item.selected && (
                <Feather name="square" size={20} color="#999" />
              )}
            </TouchableOpacity>
            <Text style={styles.cardText}>
              {item.type} {item.number} {item.expiry}
            </Text>
            <TouchableOpacity>
              <Feather name="edit-2" size={18} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add New Card Section */}
      <Text style={styles.sectionTitle}>Add A New Card</Text>

      <TextInput
        style={styles.input}
        placeholder="Card Holder’s Name"
        value={newCard.name}
        onChangeText={(text) => setNewCard({ ...newCard, name: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        value={newCard.number}
        onChangeText={(text) => setNewCard({ ...newCard, number: text })}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Expiry date"
          keyboardType="numeric"
          value={newCard.expiry}
          onChangeText={(text) => setNewCard({ ...newCard, expiry: text })}
        />

        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="CVV"
          keyboardType="numeric"
          secureTextEntry
          value={newCard.cvv}
          onChangeText={(text) => setNewCard({ ...newCard, cvv: text })}
        />
      </View>

      {/* Save Card Checkbox */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setNewCard({ ...newCard, saveInfo: !newCard.saveInfo })}
      >
        <Feather
          name={newCard.saveInfo ? "check-square" : "square"}
          size={20}
          color={newCard.saveInfo ? "#f90" : "#999"}
        />
        <Text style={styles.checkboxText}>Save Card Information</Text>
      </TouchableOpacity>

      {/* Add Card Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManageCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  checkbox: {
    padding: 5,
  },
  cardText: {
    flex: 1,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    color: "green",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxText: {
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: "#f90",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
