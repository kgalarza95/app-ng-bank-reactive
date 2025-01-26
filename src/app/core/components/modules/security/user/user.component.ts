import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicTableComponent } from '../../../util/dynamic-table/dynamic-table.component';
import { InputFloatComponent } from '../../../util/input-float/input-float.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../util/button/button.component';
import { DialogComponent } from '../../../util/dialog/dialog.component';
import { DialogService } from '../../../util/dialog-container/dialog.service';
import { ContainerComponent } from '../../../util/container/container.component';
import { SelectComponent } from '../../../util/select/select.component';
import { NotificationService } from '../../../util/notification/notification.service';
import { NotificationComponent } from '../../../util/notification/notification.component';
import { ConfirmationDialogComponent } from '../../../util/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user',
  imports: [ConfirmationDialogComponent, DynamicTableComponent, InputFloatComponent, CommonModule, FormsModule, ButtonComponent, DialogComponent, ContainerComponent, SelectComponent, NotificationComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {


  columns = [
    { key: 'nombre', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Correo', sortable: true }
  ];

  data = [
    { nombre: 'Ana', email: 'ana@example.com' },
    { nombre: 'Pedro', email: 'pedro@example.com' },
    { nombre: 'Sofía', email: 'sofia@example.com' },
    { nombre: 'Carlos', email: 'carlos@example.com' },
    { nombre: 'Laura', email: 'laura@example.com' },
    { nombre: 'Miguel', email: 'miguel@example.com' },
    { nombre: 'Isabela', email: 'isabela@example.com' },
    { nombre: 'Daniel', email: 'daniel@example.com' },
    { nombre: 'Valentina', email: 'valentina@example.com' },
    { nombre: 'Mateo', email: 'mateo@example.com' },
    { nombre: 'Camila', email: 'camila@example.com' },
    { nombre: 'Samuel', email: 'samuel@example.com' },
    { nombre: 'Renata', email: 'renata@example.com' },
    { nombre: 'Javier', email: 'javier@example.com' },
    { nombre: 'Martina', email: 'martina@example.com' },
    { nombre: 'Sebastián', email: 'sebastian@example.com' },
    { nombre: 'Valeria', email: 'valeria@example.com' },
    { nombre: 'Nicolás', email: 'nicolas@example.com' },
    { nombre: 'Antonia', email: 'antonia@example.com' },
    { nombre: 'Joaquín', email: 'joaquin@example.com' },
    { nombre: 'Gabriela', email: 'gabriela@example.com' },
    { nombre: 'Diego', email: 'diego@example.com' },
    { nombre: 'Emilia', email: 'emilia@example.com' },
    { nombre: 'Lucas', email: 'lucas@example.com' },
    { nombre: 'Catalina', email: 'catalina@example.com' },
    { nombre: 'Benjamín', email: 'benjamin@example.com' },
    { nombre: 'Victoria', email: 'victoria@example.com' },
    { nombre: 'Thiago', email: 'thiago@example.com' },
    { nombre: 'Constanza', email: 'constanza@example.com' },
    { nombre: 'Santiago', email: 'santiago@example.com' },
  ];
  constructor(private dialogService: DialogService,
    private viewContainerRef: ViewContainerRef,
    private toastService: NotificationService) { }

  ngOnInit(): void {
    console.log('UserComponent.....................................');
  }


  username: string = '';
  email: string = '';
  password: string = '';
  usuario: string = '';
  busqueda: string = '';
  fecha: string = '';
  direccion: string = '';
  telefono: string = '';

  // Ejemplo de manejo de error con una propiedad
  telefonoError: string = '';

  validarTelefono() {
    if (this.telefono.length !== 10) {
      this.telefonoError = 'El teléfono debe tener 10 dígitos';
    } else {
      this.telefonoError = '';
    }
  }

  obtenerValor() {
    console.log("Valor del input:", this.username);
    // Puedes hacer lo que quieras con el valor, como enviarlo a un servicio
  }


  guardar() {
    console.log("guardar");
  }

  cancelar() {
    console.log("cancelar");
  }


  showDialog = false;

  abrirDialogo() {
    this.showDialog = true;
  }


  /*  openDialog() {
     const dialogRef = this.dialogService.open(
       ConfirmationDialogComponent,
       this.viewContainerRef,
       {
         width: '400px',
         height: '300px',
         data: {
           title: 'Mi Diálogo Personalizado'
         }
       }
     );
 
     dialogRef.afterClosed().subscribe(result => {
       console.log('Resultado del diálogo:', result);
     });
   } */


  // En tu componente padre:
  options = [
    { value: 'es', label: 'España' },
    { value: 'mx', label: 'México' },
    { value: 'us', label: 'Estados Unidos' }
  ];

  selectedCountry = 'mx'; // Valor preseleccionado


  showSuccessToast() {
    this.toastService.show({
      message: 'Operación realizada con éxito',
      type: 'success',
      duration: 3000
    });
  }

  showErrorToast() {
    this.toastService.show({
      message: 'Ha ocurrido un error',
      type: 'error'
    });
  }

  showWarningToast() {
    this.toastService.show({
      message: 'Advertencia: Revisa tu información',
      type: 'warning'
    });
  }

  showInfoToast() {
    this.toastService.show({
      message: 'Información importante',
      type: 'info'
    });
  }



  isDialogOpen = false;

  openDialog() {
    this.isDialogOpen = true;
  }

  onConfirmDelete() {
    console.log('Item deleted');
    this.isDialogOpen = false;
  }

  onCancelDelete() {
    console.log('Delete canceled');
    this.isDialogOpen = false;
  }
}
