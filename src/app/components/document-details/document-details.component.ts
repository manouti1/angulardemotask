import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DocumentsService } from '../../services/documents/documents.service';
import { Document } from '../../classes/document';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {
  document?: Document;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDocument();
  }

  getDocument(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.documentService.getDocument(+id)
        .subscribe((document: Document) => this.document = document);
    }
  }
  goBack(): void {
    this.location.back(); // <-- Use this method to navigate back
  }
}
