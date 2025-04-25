import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  docData,
  collection,
  collectionData,
  DocumentData,
  addDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { getDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  async add<T extends DocumentData>(path: string, data: T): Promise<void> {
    const collRef = collection(this.firestore, path);
    await addDoc(collRef, data);
  }

  async set<T extends DocumentData>(path: string, id: string, data: T): Promise<void> {
    const docRef = doc(this.firestore, path, id);
    await setDoc(docRef, data);
  }

  get<T extends DocumentData>(path: string, id: string): Observable<T | undefined> {
    const docRef = doc(this.firestore, path, id);
    return docData(docRef) as Observable<T | undefined>;
  }

  getAll<T extends DocumentData>(path: string): Observable<T[]> {
    const collRef = collection(this.firestore, path);
    return collectionData(collRef, { idField: 'id' }) as Observable<T[]>;
  }

  async delete(path: string, id: string): Promise<void> {
    const docRef = doc(this.firestore, path, id);
    await deleteDoc(docRef);
  }

  async getOnce<T>(path: string, id: string): Promise<T | undefined> {
    const docRef = doc(this.firestore, path, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : undefined;
  }
}
