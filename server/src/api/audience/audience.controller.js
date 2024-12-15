const { db } = require('../../config/firebaseConfig');
const { collection, addDoc, getDocs, doc, getDoc, deleteDoc } = require('firebase/firestore');

// Obtener todas las audiencias de un expediente
const getAudiencesByRecordId = async (req, res) => {
  const { recordId } = req.params;

  try {
    const audienceCollectionRef = collection(db, `records/${recordId}/audiences`);
    const snapshot = await getDocs(audienceCollectionRef);
    const audiences = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(audiences);
  } catch (error) {
    console.error('Error fetching audiences:', error.message);
    res.status(500).json({ error: 'Error fetching audiences', details: error.message });
  }
};

// Crear una nueva audiencia
const createAudience = async (req, res) => {
  const { recordId } = req.params;
  const { fecha, hora, juez, participantes, estado, expedientes, descripcion, actaUrl } = req.body;

  console.log("Request params:", req.params);
  console.log("Request body:", req.body);

  if (!fecha || !hora || !juez || !estado || !descripcion || !expedientes || !participantes) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const audienceCollectionRef = collection(db, `records/${recordId}/audiences`);
    const newAudience = {
      fecha,
      hora,
      juez,
      participantes: JSON.parse(participantes),
      estado,
      expedientes: JSON.parse(expedientes),
      descripcion,
      actaUrl: actaUrl || null,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(audienceCollectionRef, newAudience);
    res.status(201).json({ message: 'Audiencia creada exitosamente', id: docRef.id });
  } catch (error) {
    console.error('Error creating audience:', error.message);
    res.status(500).json({ error: 'Error creating audience', details: error.message });
  }
};

// Eliminar una audiencia
const deleteAudience = async (req, res) => {
  const { recordId, audienceId } = req.params;

  try {
    const audienceRef = doc(db, `records/${recordId}/audiences/${audienceId}`);
    await deleteDoc(audienceRef);
    res.status(200).json({ message: 'Audiencia eliminada exitosamente' });
  } catch (error) {
    console.error('Error deleting audience:', error.message);
    res.status(500).json({ error: 'Error deleting audience', details: error.message });
  }
};

module.exports = {
  getAudiencesByRecordId,
  createAudience,
  deleteAudience,
};
