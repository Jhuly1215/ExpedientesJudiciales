const { db } = require('../../config/firebaseConfig');
const { collection, query, where, getDocs, addDoc, doc, deleteDoc } = require('firebase/firestore');


// Obtener movimientos de un expediente
const getMovements = async (req, res) => {
    const { recordId } = req.params;
    console.log("Record ID in backend:", recordId); // Verificar que el recordId llegue al backend
  
    try {
      const movementsRef = collection(db, "records", recordId, "movements");
      const querySnapshot = await getDocs(movementsRef);
  
      const movements = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Movements fetched:", movements); // Verificar que los movimientos se obtienen correctamente
      res.status(200).json(movements);
    } catch (error) {
      console.error("Error fetching movements:", error.message);
      res.status(500).json({ error: "Error fetching movements", details: error.message });
    }
};
  
  

// Añadir un nuevo movimiento

const addMovement = async (req, res) => {
    const { recordId } = req.params;
    const { fecha, movimiento, sede, tipo, detalles } = req.body;
    
    console.log("Record ID received:", recordId);
    console.log("Movement data received:", req.body);

    // Validar campos obligatorios
    if (!fecha || !movimiento || !sede || !tipo || !detalles) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    try {
      // Crear un nuevo documento en la subcolección de movimientos
      const docRef = await addDoc(collection(db, `records/${recordId}/movements`), {
        fecha,
        movimiento,
        sede,
        tipo,
        detalles,
        createdAt: new Date().toISOString(),
      });
  
      res.status(201).json({ message: 'Movimiento creado exitosamente', id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el movimiento', details: error.message });
    }
  };
const deleteMovement = async (req, res) => {
    const { id } = req.params;
  
    try {
      const movementRef = doc(db, "movements", id);
      await deleteDoc(movementRef);
  
      res.status(200).json({ message: "Movimiento eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el movimiento", details: error.message });
    }
};
  
module.exports = { getMovements, deleteMovement, addMovement};
