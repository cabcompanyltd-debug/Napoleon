import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult, 
  signOut as firebaseSignOut, 
  User 
} from "firebase/auth";
import { 
  getFirestore, 
  initializeFirestore,
  setLogLevel,
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc, 
  deleteDoc, 
  increment, 
  serverTimestamp 
} from "firebase/firestore";

// Read Firebase Config from generated config file
import firebaseConfigJson from "../../firebase-applet-config.json";

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfigJson);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Silence internal SDK warnings in sandboxed preview environments
setLogLevel('error');

// Initialize Firestore with long polling for iframe/sandbox environments to prevent WebSocket timeouts
export const db = firebaseConfigJson.firestoreDatabaseId 
  ? initializeFirestore(app, { experimentalForceLongPolling: true }, firebaseConfigJson.firestoreDatabaseId)
  : initializeFirestore(app, { experimentalForceLongPolling: true });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentUser = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const saveUserProfile = async (user: User) => {
  const path = `users/${user.uid}`;
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "Valued Guest",
      photoURL: user.photoURL || "",
      lastLoginAt: serverTimestamp(),
      createdAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

// Auth Helper Functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await saveUserProfile(user);
    return user;
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    // If popup is blocked by browser or iframe constraints, try redirect auth
    if (error?.code === 'auth/popup-blocked' || error?.message?.includes('popup-blocked')) {
      console.warn("Popup blocked, trying signInWithRedirect...");
      try {
        await signInWithRedirect(auth, googleProvider);
        return null;
      } catch (redirectError) {
        console.error("Error with redirect sign-in:", redirectError);
        throw redirectError;
      }
    }
    throw error;
  }
};

export const handleRedirectAuthResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      await saveUserProfile(result.user);
      return result.user;
    }
  } catch (error: any) {
    // Gracefully handle iframe/sandbox IndexedDB closing or redirect result errors
    if (
      error?.message?.includes('Database is closing') ||
      error?.message?.includes('closing/hidden') ||
      error?.code === 'auth/internal-error'
    ) {
      console.warn("Redirect result skipped due to storage restrictions:", error?.message);
    } else {
      console.error("Error processing redirect result:", error);
    }
  }
  return null;
};

export const logoutUser = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Firestore Submission Helpers
export const submitContactInquiry = async (data: {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  inquiryType: string;
  subject?: string;
  message: string;
  userId?: string;
}) => {
  const path = "contact_inquiries";
  try {
    const colRef = collection(db, path);
    return await addDoc(colRef, {
      ...data,
      status: "new",
      createdAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const getContactInquiries = async () => {
  const path = "contact_inquiries";
  try {
    const colRef = collection(db, path);
    const snapshot = await getDocs(colRef);
    const list: any[] = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    return list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  } catch (error) {
    console.error("Error fetching contact inquiries:", error);
    return [];
  }
};

export const updateContactInquiryStatus = async (inquiryId: string, status: string) => {
  try {
    const docRef = doc(db, "contact_inquiries", inquiryId);
    await updateDoc(docRef, { status, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("Error updating inquiry status:", error);
  }
};

export const saveUserProfileWithRole = async (user: User, role: 'admin' | 'user' = 'user') => {
  if (!user) return;
  const path = `users/${user.uid}`;
  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: role,
        createdAt: new Date().toISOString()
      });
    } else {
      await updateDoc(docRef, {
        role: role,
        lastLogin: new Date().toISOString()
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getUserRole = async (uid: string): Promise<'admin' | 'user'> => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().role || 'user';
    }
  } catch (error: any) {
    if (error?.code === 'unavailable' || error?.message?.includes('offline') || error?.message?.includes('client is offline')) {
      console.warn("Client offline or backend temporarily unreachable. Defaulting user role to 'user'.");
    } else {
      console.error("Error getting user role:", error);
    }
  }
  return 'user';
};

export const subscribeNewsletter = async (email: string) => {
  const path = "newsletter_subscriptions";
  try {
    const colRef = collection(db, path);
    return await addDoc(colRef, {
      email,
      subscribedAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const submitPartnerInquiry = async (data: {
  fullName: string;
  email: string;
  organization?: string;
  partnerCategory: string;
  message: string;
  userId?: string;
}) => {
  const path = "partner_inquiries";
  try {
    const colRef = collection(db, path);
    return await addDoc(colRef, {
      ...data,
      createdAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

// ================= BLOG POSTS FIRESTORE HELPERS =================
export interface BlogPostData {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  authorName: string;
  authorEmail: string;
  authorUid: string;
  authorPhoto?: string;
  category: string;
  tags?: string[];
  isPublished: boolean;
  readTime: string;
  publishedAt: string;
  likesCount?: number;
  viewsCount?: number;
}

export const createBlogPost = async (post: Omit<BlogPostData, 'id' | 'likesCount' | 'viewsCount'>) => {
  const path = "blog_posts";
  try {
    const colRef = collection(db, path);
    const docRef = await addDoc(colRef, {
      ...post,
      likesCount: 0,
      viewsCount: 1,
      createdAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const updateBlogPost = async (postId: string, post: Partial<BlogPostData>) => {
  const path = `blog_posts/${postId}`;
  try {
    const docRef = doc(db, "blog_posts", postId);
    await updateDoc(docRef, {
      ...post,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

export const deleteBlogPost = async (postId: string) => {
  const path = `blog_posts/${postId}`;
  try {
    const docRef = doc(db, "blog_posts", postId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

export const getPublishedBlogPosts = async (): Promise<BlogPostData[]> => {
  const path = "blog_posts";
  try {
    const colRef = collection(db, path);
    const q = query(colRef, where("isPublished", "==", true));
    const snapshot = await getDocs(q);
    const posts: BlogPostData[] = [];
    snapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() } as BlogPostData);
    });
    // Sort client-side to avoid compound index requirements
    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) {
    console.error("Error fetching published blog posts:", error);
    return [];
  }
};

export const getUserBlogPosts = async (userId: string): Promise<BlogPostData[]> => {
  const path = "blog_posts";
  try {
    const colRef = collection(db, path);
    const q = query(colRef, where("authorUid", "==", userId));
    const snapshot = await getDocs(q);
    const posts: BlogPostData[] = [];
    snapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() } as BlogPostData);
    });
    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) {
    console.error("Error fetching user blog posts:", error);
    return [];
  }
};

export const incrementBlogPostLike = async (postId: string) => {
  const path = `blog_posts/${postId}`;
  try {
    const docRef = doc(db, "blog_posts", postId);
    await updateDoc(docRef, {
      likesCount: increment(1)
    });
  } catch (error) {
    console.error("Error incrementing like:", error);
  }
};

