export class UsuarioModel {
    private _uid: string = '';
    private _nombre: string = '';
    private _correo: string = '';
  
    constructor(uid: string, nombre: string, correo: string) {
      this._uid = uid;
      this._nombre = nombre;
      this._correo = correo;
    }
  
    get uid(): string {
      return this._uid;
    }
  
    set uid(value: string) {
      this._uid = value;
    }
  
    get nombre(): string {
      return this._nombre;
    }
  
    set nombre(value: string) {
      this._nombre = value;
    }
  
    get correo(): string {
      return this._correo;
    }
  
    set correo(value: string) {
      this._correo = value;
    }
  
    toObject(): any {
      return {
        uid: this._uid,
        nombre: this._nombre,
        correo: this._correo
      };
    }
  }
