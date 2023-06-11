import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../services/documents/documents.service';
import { Document } from '../../classes/document';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  documents: Document[] = [];

  constructor(
    private authService: AuthService,
    private documentsService: DocumentsService
  ) { }

  ngOnInit(): void {
    const email = this.authService.getCurrentUserEmail();
    this.documentsService.getDocumentsByEmail(email)
      .subscribe(documents => this.documents = documents);
  }

}
