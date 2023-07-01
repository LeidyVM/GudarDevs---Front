import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IPhonebook } from '../interfaces/auth.interfaces';
import { Observable } from 'rxjs';

const BASE_URL = "https://localhost:7240";
@Injectable({
  providedIn: 'root'
})
export class PhonebookService {

  constructor(private http: HttpClient) { }

  savePhonebook(data: IPhonebook): Observable<IPhonebook> {
    return this.http
      .post<IPhonebook>(`${BASE_URL}/phonebook`, data);
  }

  getAllPhonebook(): Observable<IPhonebook[]> {
    return this.http
      .get<IPhonebook[]>(`${BASE_URL}/phonebook`);
  }

  deletePhonebook(id: number): Observable<IPhonebook> {
    return this.http
      .delete<IPhonebook>(`${BASE_URL}/phonebook/${id}`);
  }

  putPhonebook(data: IPhonebook): Observable<IPhonebook> {
    return this.http
      .put<IPhonebook>(`${BASE_URL}/phonebook/${data.id}`, data);
  }
}
