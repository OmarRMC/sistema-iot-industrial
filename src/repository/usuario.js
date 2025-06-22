import { db } from '../database.js';
import { where, doc, getDoc, getDocs, collection, setDoc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
export async function getAllUsuarios() {
    const usuariosCol = collection(db, 'usuarios');
    const q = query(usuariosCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getUsuarioById(id) {
    const usuarioRef = doc(db, 'usuarios', id);
    const snap = await getDoc(usuarioRef);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
}

export async function createUsuario(data, ref = null) {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const usuariosCol = collection(db, 'usuarios');
    const usuarioRef = ref ?? doc(usuariosCol);
    await setDoc(usuarioRef, data);
    return usuarioRef.id;
}


export async function updateUsuario(req, data) {
    const { id } = req.params;
    const {
        nombre,
        apellido,
        correo,
        rol,
        telefono,
        password, confirmar_password
    } = data;

    const dataStore = {
        nombre,
        apellido,
        correo,
        rol,
        telefono,
        updatedAt: new Date()
    };
    if (password && password != '') {
        dataStore.password = password;
    }
    try {
        const userRef = doc(db, 'usuarios', id);
        await updateDoc(userRef, dataStore);
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        res.status(500).send('Error actualizando usuario');
    }
}

export async function actualizarPasswordUsuario(id, nuevaPassword) {
    try {
        const userRef = doc(db, 'usuarios', id);
        await updateDoc(userRef, {
            password: nuevaPassword,
            updatedAt: new Date()
        });
    } catch (error) {
        console.error('Error actualizando contraseña:', error);
        throw new Error('No se pudo actualizar la contraseña');
    }
}
export async function deleteUsuario(id) {
    const usuarioRef = doc(db, 'usuarios', id);
    await deleteDoc(usuarioRef);
}

export async function loginUsuario(email, password) {
    const usuariosCol = collection(db, 'usuarios');
    const q = query(usuariosCol, where('correo', '==', email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        throw new Error('Credenciales inválidas');
    }
    console.log(snapshot.docs.length);
    const userDoc = snapshot.docs[0];
    let userData = userDoc.data();
    userData.id = userDoc.id;
    const isPasswordValid = password === userData.password;
    if (!isPasswordValid) {
        throw new Error('Credenciales inválidas');
    }

    return {
        id: userDoc.id,
        correo: userData.correo,
        rol: userData.rol || 'normal',
        user: userData
    };
}


export async function getUsuariosCount() {
    const usuariosCol = collection(db, 'usuarios');
    const snapshot = await getDocs(usuariosCol);
    return snapshot.docs.length;
}