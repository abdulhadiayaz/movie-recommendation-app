import { ref } from 'vue';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useUser() {
  const user = ref(null);
  const userData = ref(null);
  const firestore = getFirestore();
  const auth = getAuth();

  // Watch for authentication state changes
  onAuthStateChanged(auth, (authUser) => {
    user.value = authUser;
    if (authUser) {
      fetchUserData(authUser.uid);
    } else {
      userData.value = null;
    }
  });

  async function fetchUserData(uid) {
    try {
      const userRef = doc(firestore, 'users', uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        userData.value = userDoc.data();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  return { user, userData };
}
