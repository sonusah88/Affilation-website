import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  orderBy,
  limit,
  increment
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, OperationType, ProductStatus } from '../types';
import { handleFirestoreError } from '../lib/errorHandler';

const COLLECTION_NAME = 'products';

export const productService = {
  async getProducts(filters?: { category?: string; featured?: boolean; trending?: boolean; limit?: number }) {
    try {
      let q = query(collection(db, COLLECTION_NAME), where('status', '==', ProductStatus.ACTIVE));

      if (filters?.category) {
        q = query(q, where('category', '==', filters.category));
      }
      if (filters?.featured) {
        q = query(q, where('isFeatured', '==', true));
      }
      if (filters?.trending) {
        q = query(q, where('isTrending', '==', true));
      }
      
      q = query(q, orderBy('createdAt', 'desc'));
      
      if (filters?.limit) {
        q = query(q, limit(filters.limit));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
      return [];
    }
  },

  async getProductById(id: string) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as Product;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${COLLECTION_NAME}/${id}`);
      return null;
    }
  },

  async trackClick(productId: string) {
    try {
      const docRef = doc(db, COLLECTION_NAME, productId);
      await updateDoc(docRef, {
        clicks: increment(1)
      });
      
      // Also log raw click
      await addDoc(collection(db, 'clicks'), {
        productId,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        referer: document.referrer
      });
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  },

  // Admin methods
  async createProduct(product: Partial<Product>) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...product,
        clicks: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
    }
  },

  async updateProduct(id: string, product: Partial<Product>) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...product,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    }
  },

  async deleteProduct(id: string) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
    }
  }
};
