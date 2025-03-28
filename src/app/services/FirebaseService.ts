import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  docData,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  async add<T extends DocumentData>(path: string, data: T): Promise<void> {
    try {
      const collRef = collection(this.firestore, path);
      await addDoc(collRef, data);
    } catch (error) {
      console.error('Error al agregar documento:', error);
      throw new Error('No se pudo agregar el documento.');
    }
  }

  async set<T extends DocumentData>(path: string, id: string, data: T): Promise<void> {
    try {
      const docRef = doc(this.firestore, path, id);
      await setDoc(docRef, data);
    } catch (error) {
      console.error('Error al establecer documento:', error);
      throw new Error('No se pudo establecer el documento.');
    }
  }

  get<T extends DocumentData>(path: string, id: string): Observable<T | undefined> {
    try {
      const docRef = doc(this.firestore, path, id);
      return docData(docRef) as Observable<T | undefined>;
    } catch (error) {
      console.error('Error al obtener documento:', error);
      throw new Error('No se pudo obtener el documento.');
    }
  }

  getAll<T extends DocumentData>(path: string): Observable<T[]> {
    const collRef = collection(this.firestore, path);
    return collectionData(collRef, { idField: 'id' }) as Observable<T[]>;
  }

  

  async delete(path: string, id: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, path, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error al eliminar documento:', error);
      throw new Error('No se pudo eliminar el documento.');
    }
  }
}
