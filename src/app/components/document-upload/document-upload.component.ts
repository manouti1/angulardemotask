import { Component } from '@angular/core';
import { DocumentsService } from '../../services/documents/documents.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Document } from '../../classes/document';
import { AuthService } from '../../services/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent {

  selectedFile: File | null = null;
  // Create a new Document
  document: Document = {
    id: Math.random(),
    name: '',
    content: '',
    owner: ''
  };

  constructor(private documentsService: DocumentsService,
    private authService: AuthService,
    private notification: NotificationService,
    private location: Location
  ) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      const isValidFile = this.validateFile(file);

      if (isValidFile) {
        this.selectedFile = file;
      } else {
        this.selectedFile = null;
        this.notification.showError("Invalid file", "Error");
      }
    }
  }

  uploadDocument() {
    if (this.selectedFile) {
      this.document.content = this.selectedFile.type;
      this.document.name = this.selectedFile.name;
      this.document.owner = this.authService.getCurrentUserEmail();

      this.documentsService.uploadDocument(this.document)
        .subscribe(result => {
          if (result)
            this.notification.showSuccess("File uploaded successfully!", "Success");
        });
    }
  }

  goBack(): void {
    this.location.back(); // <-- Use this method to navigate back
  }

  private validateFile(file: File): boolean {
    // Check file type and size here
    const validTypes = ['application/pdf', 'text/plain']; // Add more types as needed
    const maxSizeInMB = 10;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (validTypes.includes(file.type) && file.size <= maxSizeInBytes) {
      return true;
    } else {
      return false;
    }
  }

}
