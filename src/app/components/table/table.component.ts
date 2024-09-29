import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: any[] = [];
  @Input() values: any[] = [];
  @Input() label: string = '';
  @Input() buttonAdd: boolean = true;

  @Output() eventEditRegister: EventEmitter<any> = new EventEmitter();
  @Output() eventActivateRegister: EventEmitter<any> = new EventEmitter();
  @Output() eventDeleteRegister: EventEmitter<any> = new EventEmitter();
  @Output() eventViewRegister: EventEmitter<any> = new EventEmitter();
  @Output() eventAddRegister: EventEmitter<any> = new EventEmitter();
  @Output() eventShowStations: EventEmitter<any> = new EventEmitter();
  @Output() eventShowStationsIndependient: EventEmitter<any> = new EventEmitter();
  @Output() eventAssignService: EventEmitter<any> = new EventEmitter();
  @Output() eventAssignServicePassenger: EventEmitter<any> = new EventEmitter();
  @Output() eventRechargePassenger: EventEmitter<any> = new EventEmitter();
  @Output() eventFinishService: EventEmitter<any> = new EventEmitter();
  @Output() eventCancelService: EventEmitter<any> = new EventEmitter();


  constructor() {}

  ngOnInit() {}

  showRechargeDialog(col: any){
    this.eventRechargePassenger.emit(col.realObject)
  }

  deleteRegister(col: any) {
    this.eventDeleteRegister.emit(col.realObject);
  }
  viewRegister(col: any) {
    this.eventViewRegister.emit(col.realObject);
  }
  editRegister(col: any) {
    this.eventEditRegister.emit(col.realObject);
  }
  activateRegister(col: any) {
    this.eventActivateRegister.emit(col.realObject);
  }
  // Cuando se da click en el botón de agregar
  addEvent() {
    this.eventAddRegister.emit();
  }
  showStations(col: any) {
     //real Object es que en las respectivos datos de las tablas se envía el dato completo
    this.eventShowStations.emit(col.realObject);
  }
  showStationsIndependient(col: any) {
     //real Object es que en las respectivos datos de las tablas se envía el dato completo
    this.eventShowStationsIndependient.emit(col);
  }
  showDialogAssignFromDriver(col: any){
    this.eventAssignService.emit(col.realObject);
  }
  showDialogFinishService(col: any){
    this.eventFinishService.emit(col.realObject);
  }
  showDialogCancelService(col: any){
    this.eventCancelService.emit(col.realObject);
  }
  assignServiceFromPassenger(col: any){
    this.eventAssignServicePassenger.emit(col.realObject);
  }
}
