import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';

import { DataTableModule } from 'angular5-data-table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule, MatSortModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ProfileEditorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DataTableModule.forRoot(),
	MatToolbarModule,
	MatInputModule,
	MatTableModule,
	MatPaginatorModule,
	BrowserAnimationsModule,
	MatSortModule
  ],
  exports: [ MatToolbarModule, MatInputModule, MatTableModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

