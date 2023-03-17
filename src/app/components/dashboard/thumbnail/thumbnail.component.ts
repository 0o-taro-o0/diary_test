import {Component, Input, SimpleChanges} from '@angular/core';
import {Diary} from "../../../diary";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css'
  ]
})
export class ThumbnailComponent {

  image_url: string = '';
  date: string = '';

  constructor(private apiService: ApiService) {
  }

  @Input() diary: Diary = <Diary>{
    date: '',
    start_time: '',
    end_time: '',
    weather: '',
    title: '',
    text: ''
  }

  @Input() image: string = '';

  onImageLoadingError() {
    this.image = '/assets/media/image/noImage.jpg'
  }

  width: number = 0;
  height: number = 0;
  private _size: number[] = [];

  get size(): number[] {
    return this._size;
  }

  @Input()
  set size(value: number[]) {
    this._size = value;
    this.width = value[0]
    this.height = value[1]
  }


}
