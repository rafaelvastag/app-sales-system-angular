import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service'
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from '../../servico-prestado.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: ServicoPrestado;
  success: boolean = false;
  errors: string[];

  constructor(private clienteService: ClientesService, private service: ServicoPrestadoService, private router: Router) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(response => this.clientes = response);
    this.servico = new ServicoPrestado();
  }

  onSubmit() {
    this.service.salvar(this.servico).subscribe(response => {
      this.success = true;
      this.errors = null;
      this.servico = new ServicoPrestado();
    }, errorResponse => {
      this.success = false;
      this.errors = errorResponse.error.errors;
    });
  }
}
