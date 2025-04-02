import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FirebaseService } from 'src/app/data/firebase.service';
import { getAuth } from '@angular/fire/auth';
import { getFirestore, doc, getDoc } from '@angular/fire/firestore';
import { Usuario } from 'src/app/interfaces/Usuario';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class PerfilPage implements OnInit {
  usuario: Usuario | null = null;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.cargarPerfil();
  }

  async cargarPerfil() {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return;
    }
    const uid = currentUser.uid;

    const firestore = getFirestore();
    const docRef = doc(firestore, 'Usuarios', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.usuario = docSnap.data() as Usuario;
    }
  }

  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateRoot('/auth/login');
  }
}
