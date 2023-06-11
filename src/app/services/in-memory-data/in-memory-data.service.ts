import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, name: 'test', email: 'user1@example.com', password: 'user1' },
      { id: 2, name: 'test2', email: 'user2@example.com', password: 'user2' } // Sample user
    ];

    const documents = [
      { id: 1, name: 'Document 1', content: 'Content of Document 1', owner: 'user1@example.com' },
      { id: 2, name: 'Document 2', content: 'Content of Document 2', owner: 'user2@example.com' },
      { id: 3, name: 'Document 3', content: 'Content of Document 3', owner: 'user1@example.com' },
      // other documents...
    ];

    return { users, documents };
  }
}