import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, db, googleProvider } from '../../../firebase/config';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const registerAdmin = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const admin = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    isAdmin: true, // Add a flag to indicate admin status
  };

  // Store admin data in a collection
  await addDoc(collection(db, 'admins'), admin);
  return admin;
};

const logout = async () => {
  return await signOut(auth);
};

const loginAdmin = async (email, password) => {
  try {
    console.log('loginAdmin')
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

 
  // Get a specific user from admins collection and filter by uid
  const adminQuery = query(collection(db, 'admins'), where('uid', '==', userCredential.user.uid));
  const querySnapshot = await getDocs(adminQuery);
  console.log('querySnapshot.docs', querySnapshot.docs)
  if (querySnapshot.docs.length === 0) {
    console.log('isAdmin === false');
  return {
      isAdmin: false,
  }
}
 

  console.log('user is admin');
    const admin = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    isAdmin: true, // Add a flag to indicate admin status
  };
  return admin;
  } catch (error) {
    console.log('err123', error);
  }
  
};

const signInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  if (!userCredential.user) throw new Error('Google login failed');
  const user = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
  };
  return user;
};

const authService = {
  logout,
  registerAdmin,
  loginAdmin,
  signInWithGoogle,
};

export default authService;
