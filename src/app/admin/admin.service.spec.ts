import { TestBed, inject } from '@angular/core/testing';

import { AdminService } from './admin.service';
import {SongPipe} from './song.pipe';
import {AngularFireDatabase, snapshotChanges} from '@angular/fire/compat/database';

describe('AdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminService]
    });
  });
  it('create an instance', () => {
    const afd = {
      list: () => {
        return {
          snapshotChanges: () => {
          }
        };
      }
    };
    const service = new AdminService(afd as unknown as AngularFireDatabase);
    expect(service).toBeTruthy();
  });
});
