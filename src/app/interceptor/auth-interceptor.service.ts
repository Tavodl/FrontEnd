import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  implements HttpInterceptor {
  private authLocalStorageToken = 'SecretKeyToExample'


  constructor() { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//Obtenemos el token del sessioStorage

const token: string = localStorage.getItem('TOKEN')||'';

let request = req;
//Validamos si el token existe
if (token) {
  //Clonamos el token y lo mandamos en la cabecera de todas las peticiones HTTP
  request = req.clone({
    setHeaders: {
      //Autorizaciòn de tipo Bearer + token
      //El tipo de autorizaciòn depende del back
      authorization: `${ token }`
    }
  });
}
    return next.handle(request);
  }


}
