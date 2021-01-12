import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../clientes.service';

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
  success: boolean = false;
  errors : string[];

  constructor( private service : ClientesService) {
    this.dataBinding = 'dataBinding';
    this.propertyBind = 'propertyBind';
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
   this.service
    .salvar(this.cliente)
    .subscribe(response => {
       this.success = true;
       this.errors = null;
       this.cliente = response;
   } , errorResponse => {
    this.success=false;
    this.errors = errorResponse.error.errors;
   });
  }

}
