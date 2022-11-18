import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Compania } from 'src/app/models/companias/compania.model';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ClientesService {
  private URL = environment.apiUrl
  private authLocalStorageToken = 'SecretKeyToExample'
  //`${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(
    public HttpClient: HttpClient,
  ) {
     this.listaClientes()

   }

  async lista3Clientes(){
    let url = `${this.URL}/company/getCompanies`
   return  this.HttpClient.get(url)
  }

  listaClientes(): Observable <any>{
    let url = `${this.URL}/company/getCompanies`
   return  this.HttpClient.get(url).pipe(
    map ((resp : any )=>{  
      console.log(resp);
        return resp
    }),      
    )//End .pipe
  }

}
