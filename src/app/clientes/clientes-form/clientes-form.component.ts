import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  errors: string[];
  id: number;

  constructor(private service: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.dataBinding = 'dataBinding';
    this.propertyBind = 'propertyBind';
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getClienteById(this.id).subscribe(response => {
          this.cliente = response;
         }, errorResponse => this.cliente = new Cliente()
        );
      }
    });
  }

  onSubmit(): void {

    if (this.id) {

      this.service
        .atualizar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        });


    } else {

      this.service
        .salvar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.cliente = response;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        });
    }
  }

  voltarListagem() {
    this.router.navigate(['/clientes']);
  }

}
