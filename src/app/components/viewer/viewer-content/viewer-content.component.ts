import {Component, Input} from '@angular/core';
import {EditorjsDataBlock} from "../../../editorjs-data";

@Component({
  selector: 'app-viewer-content',
  templateUrl: './viewer-content.component.html',
  styleUrls: ['./viewer-content.component.css']
})
export class ViewerContentComponent {
  @Input() block: EditorjsDataBlock = {type:'', data: {}, id: ''};

}
