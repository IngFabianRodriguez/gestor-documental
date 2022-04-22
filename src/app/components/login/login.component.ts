import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message_login: string = "";
  login_ok: boolean = false;
  login_fallido: boolean = false;

  constructor( private service_login: LoginService, public router: Router) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario() {
    this.form = new FormGroup({
      'documento_usuario': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]{1,20}')]),
      'password_usuario': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]{1,20}')]),
    });
  }

  home(){
    this.router.navigate(['/home']);
  }

  create_session(){
    let random_number = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.service_login.set_session(random_number);
  }


  login(){
    let data: any = {
      documento_usuario: this.form.get('documento_usuario').value,
      password_usuario: this.form.get('password_usuario').value
    }
    this.service_login.login(data).subscribe((res: any) => {
      this.login_fallido = false;
      this.service_login.set_documento(data.documento_usuario);
      this.message_login = res.message;
      this.login_ok = true;
      setTimeout(() => {
        this.create_session();
        this.home();
      }, 1000);
    }, (error: any) => {
      this.login_ok = false;
      this.message_login = error.error.message;
      this.login_fallido = true;
    });
  }
}

