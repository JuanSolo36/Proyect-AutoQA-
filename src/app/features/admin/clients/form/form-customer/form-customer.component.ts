import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { errorMessage } from '../../../../../core/helpers/validationsForm';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Customer } from '../../../../../core/models/customer/cutomer';
import { States } from '../../../../../core/models/states';
import { Rol } from '../../../../../core/models/roles';
import { CustomerService } from '../../../../../core/services/customer/customer.service';
import { showMessage, TypeMessage } from '../../../../../core/models/message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-customer',
  standalone: false,
  templateUrl: './form-customer.component.html',
  styleUrl: './form-customer.component.css',
  providers: [MessageService],
})
export class FormCustomerComponent {
  formCustomer!: FormGroup;
  isLoading: boolean = false;
  isEditMode = false;

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private customerService: CustomerService,
    private messageService: MessageService
  ) {
    this.formCustomer = this.formBuilder.group({
      customerName: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?!.*S[MG]O\\b)[A-ZÑÁËÍÓÚÜa-zñáéíóúü0-9,()]+(?: [A-ZÑÁËÍÓÚÜa-zñáéíóúü0-9,()]+)*$'
          ),
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      nitNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern('[0-9]+'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
      password: [''],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
          Validators.pattern('[0-9]+'),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-ZÀ-ÿ\\u00f1\\u00d1]+(\\s*[a-zA-ZÀ-ÿ\\u00f1\\u00d1]*)*[a-zA-ZÀ-ÿ\\u00f1\\u00d1]+$'
          ),
          Validators.minLength(2),
          Validators.maxLength(60),
        ],
      ],
    });
  }

  ngOnInit(): void {
    if (this.config.data?.customer !== undefined) {
      this.isEditMode = true;
      this.loadDataEdit();
    } else {
      this.isEditMode = false;
    }
    this.setupPasswordField();
  }

  setupPasswordField() {
    if (this.isEditMode) {
      this.formCustomer.get('password')?.clearValidators();
    } else {
      this.formCustomer
        .get('password')
        ?.setValidators([
          Validators.required,
          Validators.pattern(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
          ),
        ]);
    }
    this.formCustomer.get('password')?.updateValueAndValidity();
  }

  loadDataEdit() {
    let customer: Customer = this.config.data.customer as Customer;
    this.formCustomer.get('customerName')?.setValue(customer.customerName);
    this.formCustomer.get('nitNumber')?.setValue(customer.nitNumber);
    this.formCustomer.get('email')?.setValue(customer.userResponsible.email);
    this.formCustomer.get('address')?.setValue(customer.address);
    this.formCustomer
      .get('phoneNumber')
      ?.setValue(customer.userResponsible.phoneNumber);
    this.formCustomer.get('name')?.setValue(customer.userResponsible.name);
  }

  onSave() {
    this.isLoading = true
    let customerRequest = {
      customerName: this.formCustomer.get('customerName')?.value,
      nitNumber: this.formCustomer.get('nitNumber')?.value,
      status: true,
      address: this.formCustomer.get('address')?.value,
      userResponsible: {
        name: this.formCustomer.get('name')?.value,
        email: this.formCustomer.get('email')?.value,
        password: this.formCustomer.get('password')?.value,
        creationDate: Date.now(),
        phoneNumber: this.formCustomer.get('phoneNumber')?.value,
        status: { id: States.Created },
        roleId: { id: Rol.Cliente },
      },
    };

    if (this.isEditMode) {
      // Lógica para editar cliente
      // this.editCustomer(customerRequest, this.config.data.customer.id);
    } else {
      this.createCustomer(customerRequest);
    }
  }

  createCustomer(customerRequest: any) {
    this.customerService.createCustomer(customerRequest).subscribe({
      next: (okResponse) => {
        this.isLoading = false;
        showMessage(
          TypeMessage.success,
          'Éxito',
          '¡Se ha creado el cliente!',
          this.messageService
        );
        this.ref.close(true);
      },
      error: (errorResponse) => {
        this.isLoading = false;
        showMessage(
          TypeMessage.error,
          'Error',
          `${errorResponse.error.message}`,
          this.messageService
        );
      },
    });
  }

  isValidField(formControlName: any) {
    return (
      this.formCustomer.controls[formControlName]?.invalid &&
      this.formCustomer.controls[formControlName].touched
    );
  }

  errorMessageForm(formControl: string): string {
    return errorMessage(formControl, this.formCustomer);
  }
}
