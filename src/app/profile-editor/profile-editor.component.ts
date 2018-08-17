import { Component, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Users } from './profile-editor-data';
import { DataTable, DataTableResource } from 'angular5-data-table';
import { MatInputModule, MatPaginator, MatTableModule, MatToolbarModule, MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
	animations: [
	trigger('detailExpand', [
	  state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
	  state('expanded', style({ height: '*', visibility: 'visible' })),
	  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
	]),
  ],
})

export class ProfileEditorComponent {

  yearLimit = 1999;
  displayedColumns = ['userName', 'email', 'fullName'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

	@ViewChild(MatSort) sort: MatSort;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
	
  ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	
  profileForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    other_details: this.fb.group({
      country: ['', Validators.required],
      telephone_number: ['', Validators.required],
      dob: ['', Validators.required]
    })
  });

  @ViewChild(DataTable) usersTable: DataTable;
  constructor(private fb: FormBuilder) { 
      this.rowColors = this.rowColors.bind(this);
  }

  rowColors(user) {
      if (user.year >= this.yearLimit) {
        return 'rgb(255, 255, 197)';
      }
  }

  onSubmit() {    

    var temp_arr = {
      userName: this.profileForm.value.userName,
      email: this.profileForm.value.email,
      fullName: this.profileForm.value.fullName,
      country: this.profileForm.value.other_details.country,
      telephone_number: this.profileForm.value.other_details.telephone_number,
      dob: this.profileForm.value.other_details.dob,
      gender: this.profileForm.value.other_details.gender
    };

    ELEMENT_DATA.push(temp_arr);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

    this.profileForm.reset();

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}


export interface Element {
  userName: string;
  email: string;
  fullName: string;
  country: string;
  telephone_number: number;
  dob: string;
  gender: string;
}

const ELEMENT_DATA: Element[] = [
  {userName: 'satnam', email: 'satnam@gmail.com', fullName: 'Satnam', country: 'india', telephone_number: 9854632541, dob: '10-04-1993', gender: 'male'}
];

export class ExampleDataSource extends DataSource<any> {
  connect(): Observable<Element[]> {
    const rows = [];
    ELEMENT_DATA.forEach(element => rows.push(element, { detailRow: true, element }));
    console.log(rows);
    return of(rows);
  }

  disconnect() { }
}