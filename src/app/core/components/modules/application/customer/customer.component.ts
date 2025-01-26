import { Component } from '@angular/core';
import { ContainerComponent } from '../../../util/container/container.component';
import { DynamicTableComponent } from '../../../util/dynamic-table/dynamic-table.component';
import { ButtonComponent } from '../../../util/button/button.component';
import { DialogComponent } from '../../../util/dialog/dialog.component';
import { DialogCustomerComponent } from './dialog-customer/dialog-customer.component';
import { Customer } from '../../../../model/customer';
import { CustomerDialogService } from '../../../../services/applications/customer/customer-dialog.service';

@Component({
  selector: 'app-customer',
  imports: [ContainerComponent, DynamicTableComponent, ButtonComponent, DialogComponent, DialogCustomerComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  customerSelected: Customer = {};

  columns = [
    { key: 'identification', label: 'Identificación', sortable: true },
    { key: 'firstName', label: 'Nombre', sortable: true },
    { key: 'lastName', label: 'Apellido', sortable: true },
    { key: 'email', label: 'Correo', sortable: true },
    { key: 'phone', label: 'Teléfono', sortable: true },
    { key: 'address', label: 'Dirección', sortable: true },
    { key: 'birthDate', label: 'Fecha de Nacimiento', sortable: true },
  ];

  data = [
    {
      identification: '0930988805',
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@example.com',
      phone: '0961251803',
      address: 'Calle Ficticia 123, Ciudad Ejemplo, País',
      birthDate: '1990-05-15',
    },
    {
      identification: '0923456789',
      firstName: 'Ana',
      lastName: 'López',
      email: 'ana.lopez@example.com',
      phone: '0987654321',
      address: 'Av. Central 456, Ciudad Ficticia, País',
      birthDate: '1985-07-22',
    },
    {
      identification: '0987654321',
      firstName: 'Carlos',
      lastName: 'Gómez',
      email: 'carlos.gomez@example.com',
      phone: '0971234567',
      address: 'Calle Secundaria 789, Otro Lugar, País',
      birthDate: '1992-03-18',
    },
    {
      identification: '0976543210',
      firstName: 'Sofía',
      lastName: 'Martínez',
      email: 'sofia.martinez@example.com',
      phone: '0991234567',
      address: 'Barrio Nuevo 123, Ciudad Nueva, País',
      birthDate: '1995-09-10',
    },
    {
      identification: '0965432109',
      firstName: 'Miguel',
      lastName: 'Rodríguez',
      email: 'miguel.rodriguez@example.com',
      phone: '0951234567',
      address: 'Calle Vieja 456, Pueblo Antiguo, País',
      birthDate: '1988-01-25',
    },
    {
      identification: '0954321098',
      firstName: 'Valeria',
      lastName: 'Fernández',
      email: 'valeria.fernandez@example.com',
      phone: '0941234567',
      address: 'Calle Principal 789, Ciudad Moderna, País',
      birthDate: '1997-12-30',
    },
    {
      identification: '0943210987',
      firstName: 'Daniel',
      lastName: 'Jiménez',
      email: 'daniel.jimenez@example.com',
      phone: '0931234567',
      address: 'Calle Norte 101, Villa Norte, País',
      birthDate: '1980-11-15',
    },
  ];

  showDialog = false;

  constructor(private customerDialogService: CustomerDialogService) { }

  abrirDialogo(customer?: Customer) {
    this.customerSelected = customer || {};
    this.showDialog = true;
    this.customerDialogService.sendCustomer(customer || null);
  }

  onInformation(event: any) {
    this.abrirDialogo(event);
  }

  onEdit(event: any) {
    this.abrirDialogo(event);
  }

  onDelete(event: any) {
    console.table(event);
  }
}
