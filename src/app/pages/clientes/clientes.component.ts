import { Component, OnInit } from '@angular/core';
import { Compania } from 'src/app/models/companias/compania.model';
import { ClientesService } from "src/app/services/clientes/clientes.service";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  companias : Compania[]

  constructor(
    public ClientesService : ClientesService,
    public authClientes : AuthService,
    private router: Router
  ) 
  { 
    console.log('on constructor;...')
      this.listarClientes()
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
  });

     
  }

  async listarClientes(){
     this.ClientesService.listaClientes().subscribe(
      (resp: any )=>{
        //console.log(resp);
        this.companias  = resp['getCompany']  
        console.log(this.companias);
        console.log('listar clientes');
      }
    )
  }

  ngOnInit(): void {
    console.log('on init;...')


  }

}
