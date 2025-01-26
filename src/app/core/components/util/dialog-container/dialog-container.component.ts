import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Type,
  OnDestroy,
  ElementRef // Importa ElementRef
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'] // Mejor usar styleUrls si usas scss
})
export class DialogContainerComponent implements OnDestroy {
  @ViewChild('dialogContent', { read: ViewContainerRef })
  dialogContent!: ViewContainerRef;

  content!: Type<any>;
  config: any = {};
  private componentRef!: ComponentRef<any>;
  private closedSubject = new Subject<any>();

  afterClosed = this.closedSubject.asObservable();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngAfterViewInit() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.content);
    this.componentRef = this.dialogContent.createComponent(factory);

    // Inyectar datos si existen
    if (this.config.data && this.componentRef.instance) {
      Object.assign(this.componentRef.instance, this.config.data);
    }
  }

  close(result?: any) {
    this.closedSubject.next(result);
    this.closedSubject.complete();

    // Destruir el componente
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    // Destruir el contenedor del diálogo
    this.viewContainerRef.clear();
  }

  ngOnDestroy() {
    this.close();
  }
}