import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[];

  constructor(
    private router: Router,
    private authService: AuthService) { }

  onSubmit() {
    this.authService
      .tryLogin(this.username, this.password)
      .subscribe(response => {
        localStorage.setItem('token', JSON.stringify(response));
        this.router.navigate(['/home']);
      }, errorResponse => {
        this.errors = ['Usuário e/ou senha incorreto(s).']
      })
  }

  prepararCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelarCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;

    this.authService.salvar(usuario)
        .subscribe(response => {
          this.mensagemSucesso = 'Cadastro realizado com sucesso! Efetue o login';
          this.errors = [];
          this.cadastrando = false;
          this.username = '';
          this.password = '';
        }, errorResponse => {
          this.mensagemSucesso = null;
          this.errors = errorResponse.error.errors;
          console.log(this.errors);
        });
  }

}
