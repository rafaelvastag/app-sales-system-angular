import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service'
import { servicoPrestado } from '../servicoPrestado';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: servicoPrestado;

  constructor( private clienteService: ClientesService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(response => this.clientes = response);
    this.servico = new servicoPrestado();
  }

  onSubmit(){
    console.log(this.servico);
  }
}
