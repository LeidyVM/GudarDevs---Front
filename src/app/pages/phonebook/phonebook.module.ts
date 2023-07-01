import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhonebookRoutingModule } from './phonebook-routing.module';
import { PhonebookComponent } from './phonebook.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PhonebookService } from './services/phonebook.service';
@NgModule({
  declarations: [
    PhonebookComponent
  ],
  imports: [
    CommonModule,
    PhonebookRoutingModule,
    HttpClientModule,

    ReactiveFormsModule,
    NgbModule
  ],
  providers: [PhonebookService]
})
export class PhonebookModule { }
