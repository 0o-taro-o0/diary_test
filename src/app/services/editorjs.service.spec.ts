import { TestBed } from '@angular/core/testing';

import { EditorjsService } from './editorjs.service';

describe('EditorjsService', () => {
  let service: EditorjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
