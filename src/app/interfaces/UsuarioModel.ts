export class UsuarioModel {
  private _uid: string;
  private _nombres: string;
  private _apellidos: string;
  private _correo: string;
  private _rol?: string;

  constructor(
    uid: string,
    nombres: string,
    apellidos: string,
    correo: string,
    rol?: string
  ) {
    this._uid = uid;
    this._nombres = nombres;
    this._apellidos = apellidos;
    this._correo = correo;
    this._rol = rol;
  }

  get uid(): string { return this._uid; }
  set uid(val: string) { this._uid = val; }

  get nombres(): string { return this._nombres; }
  set nombres(val: string) { this._nombres = val; }

  get apellidos(): string { return this._apellidos; }
  set apellidos(val: string) { this._apellidos = val; }

  get correo(): string { return this._correo; }
  set correo(val: string) { this._correo = val; }

  get rol(): string | undefined { return this._rol; }
  set rol(val: string | undefined) { this._rol = val; }

  toObject(): any {
    return {
      uid: this._uid,
      nombres: this._nombres,
      apellidos: this._apellidos,
      correo: this._correo,
      rol: this._rol
    };
  }
}
