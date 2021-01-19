import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  baseURL: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  salvar(cliente : Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseURL}/api/clientes`, cliente);
  }

  getClientes() : Observable<Cliente[]> {
   return this.http.get<Cliente[]>(`${this.baseURL}/api/clientes`);
  }

  getClienteById(id : number) : Observable<Cliente> {
    return this.http.get<any>(`${this.baseURL}/api/clientes/${id}`);
  }

  atualizar(cliente: Cliente) : Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseURL}/api/clientes/${cliente.id}`, cliente);
  }

  deletar(id : number) {
    return this.http.delete(`${this.baseURL}/api/clientes/${id}`);
  }

}
