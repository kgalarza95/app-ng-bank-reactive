import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  hidden?: boolean;
}

@Component({
  selector: 'app-dynamic-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent implements OnInit, OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() showEditButton: boolean = true;
  @Input() showDeleteButton: boolean = true;
  @Output() infoEvent = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  currentPage = 1;
  pageSize = 5;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  private _currentData: any[] = [];
  private _sortedData: any[] = [];

  constructor() {
    this.validateInputs();
  }

  ngOnInit() {
    this._currentData = [...this.data];
    this.updateSortedData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this._currentData = [...this.data];
      this.updateSortedData();
      this.currentPage = 1;
    }
  }

  validateInputs() {
    if (!this.data || !this.columns) {
      throw new Error('Datos y columnas son requeridos');
    }
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this._sortedData.slice(startIndex, startIndex + this.pageSize);
  }

  private updateSortedData() {
    if (!this.sortColumn) {
      this._sortedData = [...this._currentData];
      return;
    }
    this._sortedData = [...this._currentData].sort((a, b) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];
      return this.sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages)
      this.currentPage = page;
  }
  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.updateSortedData();
    this.currentPage = 1;
  }
  get totalPages() {
    return Math.ceil(this._currentData.length / this.pageSize);
  }

  mostrarInformacion(item: any) {
    this.infoEvent.emit(item);
  }

  editar(item: any) {
    this.editEvent.emit(item);
  }

  eliminar(item: any) {
    this.deleteEvent.emit(item);
  }
}
