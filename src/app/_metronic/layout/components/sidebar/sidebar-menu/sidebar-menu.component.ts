import { Component, OnInit } from '@angular/core';
import { ClientesComponent } from "src/app/pages/clientes/clientes.component";
import { AuthService } from "src/app/modules/auth/services/auth.service";

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  

  constructor(
    public authClientes : AuthService

  ) {
  
  }

    async clientes(){
      this.authClientes.listaClientes().subscribe(
        (resp: any )=>{
          //console.log(resp);
          console.log( resp['getCompany']);
        }
      )
      console.log('hola');
      
    }

  ngOnInit(): void {
    console.log('Pasa por sidebar');
    
  }

}
