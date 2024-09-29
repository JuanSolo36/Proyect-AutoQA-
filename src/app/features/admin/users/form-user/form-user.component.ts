import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Password } from 'primeng/password';
import { UserRequest } from '../../../../core/models/user/userTable.interface';
import { TypeMessage, showMessage } from '../../../../core/models/message';
import { errorMessage, passwordValidator } from '../../../../core/helpers/validationsForm';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../../core/services/administrator/user.service';
import { Rol } from '../../../../core/models/roles';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {
  
  uploadedFiles: any[] = [];
  isLoading: boolean = false;
  roleIds: any;
  formUser!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.formUser = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$'
          ),
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(20),
          passwordValidator
        ],
      ],
      roleId: [null, Validators.required],
      status: [{id: 7},Validators.required]
    });
  }

  
  ngOnInit(): void {
    this.roleIds = [
      { name: 'Administrador', id: 12 },
      { name: 'Cliente', id: 13 },
      { name: 'Operario', id: 14 },
  ];

    //Si es diferente de undifined es porque se va a editar
    console.log(this.config.data)
    if(this.config.data !== undefined){
      const user = this.config.data.user as any;
      this.formUser.get('name')?.setValue(user.name);
      this.formUser.get('email')?.setValue(user.email);
      this.formUser.get('roleId')?.setValue(user.roleId.id);
      this.formUser.get('status')?.setValue({ code: user.status.id });
      this.formUser.get('password')?.disable();

    }
  }
  saveUser() {
    this.isLoading = true;
    const userRequest: UserRequest = {
      name: this.formUser.get('name')?.value,
      email: this.formUser.get('email')?.value,
      password: this.formUser.get('password')?.value,
      roleId: {id: this.formUser.get('roleId')?.value},
      status: this.formUser.get('status')?.value
    }
    //Si es diferente de undifined es porque se va a editar
    if(this.config.data !== undefined){
      this.editUser(userRequest, this.config.data.user.id);
    }else{
      console.log(userRequest)
      this.createUser(userRequest); 
    }
  }

  createUser(userRequest: UserRequest){
    console.log(userRequest)
    if(userRequest.roleId.id == Rol.Administrator){

      this.userService.createUser(userRequest).subscribe({
        next: () => {
          this.isLoading = false;
          showMessage(TypeMessage.success, 'Éxito', '¡Se ha creado el usuario!', this.messageService);
          this.ref.close(true);
        },
        error: (errorResponse: any) => {
          this.isLoading = false;
          showMessage(TypeMessage.error, 'Error', `${errorResponse.error.message}`, this.messageService);
        },
      });
    }else if(userRequest.roleId.id == Rol.Cliente){
      this.userService.createUser(userRequest).subscribe({
        next: () => {
          this.isLoading = false;
          showMessage(TypeMessage.success, 'Éxito', '¡Se ha creado el usuario!', this.messageService);
          this.ref.close(true);
        },
        error: (errorResponse: any) => {
          this.isLoading = false;
          showMessage(TypeMessage.error, 'Error', `${errorResponse.error.message}`, this.messageService);
        },
      });
    } else if(userRequest.roleId.id == Rol.Operario){
      this.userService.createUser(userRequest).subscribe({
        next: () => {
          this.isLoading = false;
          showMessage(TypeMessage.success, 'Éxito', '¡Se ha creado el usuario!', this.messageService);
          this.ref.close(true);
        },
        error: (errorResponse: any) => {
          console.log(errorResponse)
          this.isLoading = false;
          showMessage(TypeMessage.error, 'Error', `${errorResponse.error.message}`, this.messageService);
        },
      });
    }
  }

  editUser(userRequest: UserRequest, idUser: string){
    // delete userRequest.password
    // userRequest.password = 'Clave1234*'
    
    if(userRequest.roleId.id == Rol.Administrator){
      // delete userRequest.roleId
      this.userService.updateUser(userRequest, idUser ).subscribe({
        next: () => {
          this.isLoading = false;
          showMessage(TypeMessage.success, 'Éxito', '¡Se ha editado el usuario!', this.messageService);
          this.ref.close(true);
        },
        error: (errorResponse: any) => {
          this.isLoading = false;
          showMessage(TypeMessage.error, 'Error', `${errorResponse.error.message}`, this.messageService);
        },
      });
    } else if(userRequest.roleId.id == Rol.Cliente){
      // delete userRequest.roleId
      this.userService.updateUser(userRequest, idUser ).subscribe({
        next: () => {
          this.isLoading = false;
          showMessage(TypeMessage.success, 'Éxito', '¡Se ha editado el usuario!', this.messageService);
          this.ref.close(true);
        },
        error: (errorResponse: any) => {
          this.isLoading = false;
          showMessage(TypeMessage.error, 'Error', `${errorResponse.error.message}`, this.messageService);
        },
      });
    } else if(userRequest.roleId.id == Rol.Operario){
      // delete userRequest.roleId
      this.userService.updateUser(userRequest, idUser ).subscribe({
        next: () => {
          this.isLoading = false;
          showMessage(TypeMessage.success, 'Éxito', '¡Se ha editado el usuario!', this.messageService);
          this.ref.close(true);
        },
        error: (errorResponse: any) => {
          this.isLoading = false;
          showMessage(TypeMessage.error, 'Error', `${errorResponse.error.message}`, this.messageService);
        },
      });
    }
  }
  

  isValidField(formControlName: any) {
    return (
      this.formUser.controls[formControlName].invalid &&
      this.formUser.controls[formControlName].touched
    );
  }
  errorMessageForm(formControl: string) {
    // válida que el formulario, de lo contrarió muestra error
    return errorMessage(formControl, this.formUser);
  }
}
