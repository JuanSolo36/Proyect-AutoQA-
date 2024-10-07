import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';
import { SecurityService } from '../../core/services/security-service/security.service';
import { Router } from '@angular/router';
import { MenuProductsService } from '../../core/services/menu-products/menu-products.service';

 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {


  select:number = 0
  items: MenuItem[] | undefined;
  options: any = [
    {
      option: 'Usuarios',
      icon: 'pi-users'
    },
    {
      option: 'Clientes',
      icon: 'pi-user'
    },
    {
      option: 'Cotizaciones',
      icon: 'pi-bookmark'
    },
    {
      option: 'Solicitudes',
      icon: 'pi-briefcase'
    },
    {
      option: 'Estado de solicitudes',
      icon: 'pi-refresh'
    },
    {
      option: 'Configuración',
      icon: 'pi-cog'
    },
  ];

  customers!: any[];

  constructor(
    private securityService: SecurityService,
    private messageService: MessageService,
    private router: Router,
    private menuProductsService: MenuProductsService
  ) { }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  ngOnInit() {
    this.items = [
      {label: 'Cerrar sesión',
        command: () => {
          this.goOut()

            //funcion para el cierre de sesion
        }
      }
    ];



  }
  sidebarAction() {
    this.sidebar = !this.sidebar
  }

  // @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  //     closeCallback(e: Event): void {
  //         this.sidebarRef.close(e);
  //     }

  //     sidebarVisible: boolean = true;
  sidebar:boolean=false;

  goOut(){
    this.securityService.LogOff();
  }
  showError(text: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
  }

  selectOption(index: number) {
    this.sidebar = false
    this.select = index;

    if(index == 0){
      this.router.navigate(['/administrator/users']);
    }

    if(index == 1){
      this.router.navigate(['/administrator/clients']);
    }

    if(index == 2){
      this.router.navigate(['/administrator/quotations']);
    }

    if(index == 3){
      this.router.navigate(['/administrator/requisitions']);
    }

    if(index == 4){
      this.router.navigate(['/administrator/statuRequisitions']);
    }
    if(index == 5){
      this.router.navigate(['/administrator/settings']);
    }

  }

}
