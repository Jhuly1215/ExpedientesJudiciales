const { db } = require('./firebaseConfig');
const { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } = require('firebase/firestore');

// Función para obtener documentos de una colección
const getCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.error(`Error al obtener la colección ${collectionName}:`, error);
    throw error;
  }
};

// Función para agregar un documento a una colección
const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error(`Error al agregar documento a la colección ${collectionName}:`, error);
    throw error;
  }
};


// Función para actualizar un documento
const updateDocument = async (collectionName, docId, data) => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
};

// Función para eliminar un documento
const deleteDocument = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};

module.exports = {
  getCollection,
  addDocument,
  updateDocument,
  deleteDocument,
};
