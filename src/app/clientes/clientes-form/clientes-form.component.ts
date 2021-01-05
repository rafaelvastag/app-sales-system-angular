import { Component, OnInit } from '@angular/core';

import { Cliente } from '../cliente'
@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  dataBinding: string;

  propertyBind: string;

  cliente: Cliente;

  constructor() {
    this.dataBinding = 'dataBinding';
    this.propertyBind = 'propertyBind';
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }

}
