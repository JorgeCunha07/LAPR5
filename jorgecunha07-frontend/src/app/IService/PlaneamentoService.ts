import { Observable } from "rxjs";

export interface IPlaneamentoService {
  findPath(edificioI: string, pisoI: string, xI: string, yI: string, edificioF: string, pisoF: string, xF: string, yF: string): Observable<any>;
}
