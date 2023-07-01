import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, map, takeUntil } from 'rxjs';
import { IPhonebook } from './interfaces/auth.interfaces';
import { PhonebookService } from './services/phonebook.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss']
})
export class PhonebookComponent implements OnInit, OnDestroy {

  phonebookForm = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    phoneNumber: new FormControl(0, Validators.required),
    textComments: new FormControl("", Validators.required)
  });

  private unsubcribe$ = new Subject<void>();

  constructor(private modalService: NgbModal, private phonebookService: PhonebookService) { }

  phonebookArray: IPhonebook[] = [];

  ngOnInit(): void {
    this.loadAllPhonebooks();
  }

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  loadAllPhonebooks(): void {
    this.phonebookService.getAllPhonebook().pipe(takeUntil(this.unsubcribe$), map(response => {
      this.phonebookArray = response;
    })).subscribe();
  }

  acepModal(): void {
    if (this.phonebookForm.valid) {
      const id = this.phonebookForm.get('id')?.value;
      if (id && id > 0) {
        Swal.fire({
          title: 'Do you want to edit?',
          showCancelButton: true,
          confirmButtonText: 'Save',
        }).then((result) => {
          if (result.isConfirmed) {
            this.editPhonebookApi();
          }
        });
      } else {
        Swal.fire({
          title: 'Do you want to save?',
          showCancelButton: true,
          confirmButtonText: 'Save',
        }).then((result) => {
          if (result.isConfirmed) {
            this.saveChangesApi();
          }
        });
      }
    }
  }

  saveChangesApi(): void {
    this.phonebookService.savePhonebook(this.dataForm()).pipe(takeUntil(this.unsubcribe$), map(response => {
      this.modalService.dismissAll()
      this.loadAllPhonebooks();
      Swal.fire('Saved!', '', 'success')
    })).subscribe();
  }

  dataForm(): IPhonebook {
    const { id, firstName, lastName, phoneNumber, textComments } = this.phonebookForm.value;
    return {
      id: id ?? 0,
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      phoneNumber: phoneNumber ?? 0,
      textComments: textComments ?? ""
    }
  }

  openModal(content: any) {
    this.phonebookForm.reset();
    this.modalService.open(content);
  }

  closeModal(): void {
    this.modalService.dismissAll()
  }

  deletePhonebook(id: number = 0): void {
    Swal.fire({
      title: 'Do you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePhonebookApi(id);
      }
    });
  }

  deletePhonebookApi(id: number): void {
    this.phonebookService.deletePhonebook(id).pipe(takeUntil(this.unsubcribe$), map(response => {
      Swal.fire('Deleted!', '', 'success')
      this.loadAllPhonebooks();
    })).subscribe();
  }

  editPhonebook(data: IPhonebook, myModalContent: any): void {
    if (data.id != 0 && data.id) {
      this.modalService.open(myModalContent);
      this.phonebookForm.patchValue(data);
    }
  }

  editPhonebookApi(): void {
    if (this.phonebookForm.valid) {
      this.phonebookService.putPhonebook(this.dataForm()).pipe(takeUntil(this.unsubcribe$), map(response => {
        this.modalService.dismissAll()
        this.loadAllPhonebooks();
        Swal.fire('Saved!', '', 'success')
      })).subscribe();
    }
  }

}
