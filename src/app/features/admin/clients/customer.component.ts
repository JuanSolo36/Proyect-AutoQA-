import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/administrator/user.service';
import { CustomerService } from '../../../core/services/customer/customer.service';
import { Customer } from '../../../core/models/customer/cutomer';
import { RoleID } from '../../../core/models/user/loginUserResponse';
import { States } from '../../../core/models/states';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { showMessage, TypeMessage } from '../../../core/models/message';
import { FormCustomerComponent } from './form/form-customer/form-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [DialogService, ConfirmationService],

})
export class CustomerComponent implements OnInit {
  
  cols = cols;
  customerTable: any[] = [];
  ref?: DynamicDialogRef;

  constructor(
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public dialogService: DialogService

  ) { }

  ngOnInit() {
    this.loadCustomers()
  }

  loadCustomers(): void {
    this.customerTable = []
    this.customerService
      .getAllCustomer()
      .subscribe({
        next: (customers) => {
          this.insertToTable(customers)
        },
        error: (errorResponse) => {
          //TODO:! Colocar alerta de errores
        },
      });
  }

  insertToTable(customers: Customer[]) {
    customers.forEach((customer) => {
      //Definiendo lo atributos para que se vea en la tabla
        if(customer.userResponsible.status.id != States.Deleted){
          const customerTable = {
            customerName: customer.customerName,
            nit: customer.nitNumber,
            address: customer.address,
            phone: customer.userResponsible.phoneNumber, 
            nameContact: customer.userResponsible.name, 
            realObject: customer,
            //es el objeto completo, es el que se emite en los eventos de eliminar, editar y consultar detalle - no se muestra en la tabla
          };
          this.customerTable.push(customerTable);
        }
      });
  }

  addElement() {
    this.ref = this.dialogService.open(FormCustomerComponent, {
      header: 'Agregar Cliente',
      width: '80%',
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe({
      next: (updateTable) => {
        if (!!updateTable) this.loadCustomers();
      },
    });
  }

  editElement(customer: Customer) {
    this.ref = this.dialogService.open(FormCustomerComponent, {
      header: 'Editar cliente',
      width: '80%',
      baseZIndex: 10000,
      data: {
        customer,
      },
    });
    this.ref.onClose.subscribe({
      next: (updateTable) => {
        if (!!updateTable) this.loadCustomers();
      },
    });
  }

  deleteElement(realObject: any) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar a ${realObject.name}?`,
      accept: () => {
        this.customerService
          .deleteCustomer(realObject.id)
          .subscribe({
            next: (value) => {
              showMessage(
                TypeMessage.info,
                'Éxito',
                `Se ha eliminado a ${realObject.customerName}`,
                this.messageService
              );
              this.loadCustomers();
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

const cols: any[] = [
  { field: 'customerName', header: 'NOMBRE' },
  { field: 'nitNumber', header: 'NIT' },
  { field: 'address', header: 'DIRECCIÓN' },
  { field: 'phone', header: 'TELÉFONO' },
  { field: 'nameContact', header: 'NOMBRE DE CONTACTO' },
  {
    field: {
      delete: true,
      view: false,
      edit: true,
    },
    header: 'ACCIONES'
  },
];