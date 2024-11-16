import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../../../core/services/administrator/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormUserComponent } from './form-user/form-user.component';
import { UserRequest } from '../../../core/models/user/userTable.interface';
import { showMessage, TypeMessage } from '../../../core/models/message';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  ref!: DynamicDialogRef; 
  
  cols = cols;
  userTable: any[] = [];
  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers(): void {
    this.userTable = []
    this.userService
      .getAllUsers()
      .subscribe({
        next: (Admins) => {
          this.insertToTable(Admins)
        },
        error: (errorResponse) => {
          //TODO:! Colocar alerta de errores
        },
      });
  }

  insertToTable(users: any[]) {
    users.forEach((user) => {
      //Definiendo lo atributos para que se vea en la tabla
        if(user.status.id != 9){
          const userTable = {
            name: user.name,
            roleId: user.roleId.parameterValue,
            email: user.email,
            creationDate: new Date(user.creationDate).toLocaleDateString(), 
            realObject: user,
            //es el objeto completo, es el que se emite en los eventos de eliminar, editar y consultar detalle - no se muestra en la tabla
          };
          this.userTable.push(userTable);
        }
      });
  }

  addElement() {
    this.ref = this.dialogService.open(FormUserComponent, {
      header: 'Agregar Usuario',
      width: '80%',
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe({
      next: (updateTable) => {
        if (!!updateTable) this.loadUsers();
      },
    });
  }

  editElement(user: UserRequest) {
    this.ref = this.dialogService.open(FormUserComponent, {
      header: 'Editar Usuario',
      width: '80%',
      data: {
        user,
      },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe({
      next: (updateTable) => {
        if (!!updateTable) this.loadUsers();
      },
    });
  }

  deleteElement(realObject: any) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar a ${realObject.name}?`,
      accept: () => {
        this.userService
          .deleteUser(realObject.id)
          .subscribe({
            next: (value) => {
              showMessage(
                TypeMessage.info,
                'Éxito',
                `Se ha eliminado a ${realObject.name}`,
                this.messageService
              );
              this.loadUsers();
            },
            error: (errorMsg) => {
              showMessage(
                TypeMessage.error,
                'Error',
                `Ocurrió un error ${errorMsg.error.message}`,
                this.messageService
              );
            },
          });
      },
    });
    
  }
  disableElement(realObject: any) {
    if(realObject.status.id === 10){
      this.confirmationService.confirm({
        message: `El usuario ${realObject.name} está deshabilitado. ¿Desea habilitarlo nuevamente?`,
        accept: () => {
          const userRequest = {
            ...realObject,
            status: {
              id: 7 
            }
          };
          this.userService.updateUser(userRequest, realObject.id).subscribe({
            next: () => {
              showMessage(
                TypeMessage.success,
                'Éxito',
                `El usuario ${realObject.name} ha sido habilitado nuevamente`,
                this.messageService
              );
              this.loadUsers(); 
            },
            error: (errorResponse: any) => {
              showMessage(
                TypeMessage.error,
                'Error',
                `Ocurrió un error: ${errorResponse.error.message}`,
                this.messageService
              );
            },
          });
        }
      }); 
    }else{
      this.confirmationService.confirm({
        message: `¿Está seguro de desactivar a ${realObject.name}?`,
        accept: () => {
          this.userService
            .disableUser(realObject.id)
            .subscribe({
              next: (value) => {
                showMessage(
                  TypeMessage.info,
                  'Éxito',
                  `Se ha desactivado a ${realObject.name}`,
                  this.messageService
                );
                this.loadUsers();
              },
              error: (errorMsg) => {
                showMessage(
                  TypeMessage.error,
                  'Error',
                  `Ocurrió un error ${errorMsg.error.message}`,
                  this.messageService
                );
              },
            });
        },
      });
    }
  }
}

const cols: any[] = [
  { field: 'name', header: 'NOMBRE' },
  { field: 'roleId', header: 'ROL' },
  { field: 'email', header: 'CORREO' },
  { field: 'creationDate', header: 'FECHA DE CREACIÓN' },
  {
    field: {
      delete: true,
      view: false,
      edit: true,
      activateR: true
    },
    header: 'ACCIONES',
  },
];