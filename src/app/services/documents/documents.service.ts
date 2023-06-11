import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Document } from '../../classes/document';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private documentsUrl = 'api/documents';  // URL to in-memory web API

  constructor(private http: HttpClient, private authService: AuthService) { }


  getDocumentsByEmail(email: string): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.documentsUrl}`)
      .pipe(
        map((documents) => {
          const filteredDocuments = documents.filter(d => d.owner === email);
          if (filteredDocuments.length > 0) {
            return filteredDocuments;
          } else {
            throw new Error("Couldn't retrieve documents");
          }
        })
      );
  }

  getDocument(id: number): Observable<Document> {
    const url = `${this.documentsUrl}/${id}`;
    return this.http.get<Document>(url);
  }

  uploadDocument(document: Document): Observable<Document> {
    document.id = Math.random();
    return this.http.post<Document>(this.documentsUrl, document).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }
}
