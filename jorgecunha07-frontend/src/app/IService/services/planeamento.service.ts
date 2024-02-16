import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {EndPointConfiguration} from "../../Constants/EndPointConfiguration";
import {IPlaneamentoService} from "../PlaneamentoService";

@Injectable({
  providedIn: 'root',
})
export class PlaneamentoService implements IPlaneamentoService{

  httpOptions = {
  }
  constructor(private authService: AuthService, private httpClient: HttpClient) {}


  findPath(edificioI: string, pisoI: string, xI: string, yI: string, edificioF: string, pisoF: string, xF: string, yF: string): Observable<any> {
    // Construindo os parâmetros inicio e fim
    const inicio = `cel(${edificioI},${pisoI},${xI},${yI})`;
    const fim = `cel(${edificioF},${pisoF},${xF},${yF})`;

    // Configurando os parâmetros HTTP
    let params = new HttpParams();
    params = params.append('inicio', inicio);
    params = params.append('fim', fim);

    // Fazendo a requisição GET
    return this.httpClient.get<any>(`${EndPointConfiguration.MASTER_DATA_ENDPOINT}/prologue/path`, { params });
  }

}
