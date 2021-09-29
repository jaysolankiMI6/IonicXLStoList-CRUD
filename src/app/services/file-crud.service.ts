import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, of, pipe } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';



export class File {
  _id: number;
  name: string;
  email: string;
  contactno: number;
  address: string;
  linkdinid: string;
  joindate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FileCrudService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) { }

  createFile(file: File): Observable<any> {
    return this.httpClient.post<File>('http://localhost:5000/api/create-file', file, this.httpOptions)
      .pipe(
        catchError(this.handleError<File>('Error Occured'))
      );
  }

  getFile(id): Observable<File[]> {
    return this.httpClient.get<File[]>('http://localhost:5000/api/fetch-file/'+id)
    .pipe(
      tap(_ => console.log('User Fetched ${id}')),
      catchError(this.handleError<File[]>('Get user id = ${id}'))
    );
  }

  getFiles(): Observable<File[]> {
    return this.httpClient.get<File[]>('http://localhost:5000/api/')
    .pipe(
        tap(files => console.log('Files Retrived')),
        catchError(this.handleError<File[]>('Get Files ',[]))
    );
  }

  updateFile(id, file: File): Observable<any> {
    return this.httpClient.put('http://localhost:5000/api/update-file/'+id, file, this.httpOptions)
    .pipe(
        tap(_ => console.log('File Updated: ${id} ')),
        catchError(this.handleError<File[]>('Update File '))
    );
  }

  deleteFile(id): Observable<File[]> {
    return this.httpClient.delete<File[]>('http://localhost:5000/api/delete-file/'+id, this.httpOptions)
      .pipe(
          tap(_ => console.log('File Deleted ${id}')),
          catchError(this.handleError<File[]>('Delete File'))
      );
  }

  // uploadFile() {
  //   return this.httpClient.post('http://localhost:5000/api/upload/', formData)
  //     .pipe(
  //         tap(_ => console.log('File Deleted ${id}')),
  //         catchError(this.handleError<File[]>('Delete File'))
  //     );
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log('${operation} failed  ${error.message}');
      return of(result as T);
    }
  }
}
