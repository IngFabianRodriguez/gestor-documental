import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = "http://localhost:5000/api/";
  documento: number;
  session: number;


  getHttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      })
    };
    return httpOptions;
  }

  constructor(private http: HttpClient) { }

  login(data:any) {
    return this.http.post(this.URL + "usuario_login", data, this.getHttpOptions());
  }

  get_usuario_by_documento(documento){
    return this.http.get(this.URL + "usuario/" + documento, this.getHttpOptions());
  }

  get_rol_by_id(id){
    return this.http.get(this.URL + "rol/" + id, this.getHttpOptions());
  }

  set_documento(documento){
    this.documento = documento;
  }

  get_documento(){
    return this.documento;
  }

  set_session(session){
    this.session = session;
  }


  get_session(){
    return this.session;
  }


  close_session(){
    this.session = null;
  }

}
