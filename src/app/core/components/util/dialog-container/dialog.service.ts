import { Injectable, ComponentRef, ViewContainerRef, ComponentFactoryResolver, Type, OnDestroy } from '@angular/core';
import { DialogContainerComponent } from './dialog-container.component';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogComponentRef: ComponentRef<DialogContainerComponent> | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  open<T>(
    content: Type<T>,
    viewContainerRef: ViewContainerRef,
    config?: {
      width?: string;
      height?: string;
      data?: any;
    }
  ) {
    // Limpiar diálogos previos
    if (this.dialogComponentRef) {
      this.dialogComponentRef.destroy();
    }

    // Crear referencia del contenedor de diálogo
    const factory = this.componentFactoryResolver.resolveComponentFactory(DialogContainerComponent);
    this.dialogComponentRef = viewContainerRef.createComponent(factory);

    // Configurar diálogo
    const dialogComponent = this.dialogComponentRef.instance;
    dialogComponent.content = content;
    dialogComponent.config = config || {};

    return {
      afterClosed: () => dialogComponent.afterClosed
    };
  }
}