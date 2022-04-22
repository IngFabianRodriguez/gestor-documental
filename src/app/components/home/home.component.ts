import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombre_completo: string = "";
  rol: string = "";
  documento: number;
  radicador: boolean = false;
  administrador: boolean = false;
  gestion: boolean = false;

  session: number;

  constructor( private service_login : LoginService, private router : Router ) { }

  ngOnInit(): void {
    this.session =this.service_login.get_session();
    this.documento = this.service_login.get_documento();
    if (this.session == null){
      this.router.navigate(['/']);
    }else{
      this.get_usuario(this.documento);
    }
  }

  get_usuario(documento){
    this.service_login.get_usuario_by_documento(documento).subscribe((data:any) => {
      this.nombre_completo = data.nombre_usuario.toUpperCase() + " " + data.apellido_usuario.toUpperCase();
      this.service_login.get_rol_by_id(data.rol_usuario).subscribe((data_rol:any) => {
        this.rol = data_rol.nombre_rol.toUpperCase();
        if (this.rol == "ADMINISTRADOR"){
          this.administrador = true;
        }else if (this.rol == "RADICADOR"){
          this.radicador = true;
        }
        else if (this.rol == "GESTION"){
          this.gestion = true;
        }
      });
    });
  }

  close_session(){
    this.service_login.close_session();
    this.router.navigate(['/']);
  }
}
