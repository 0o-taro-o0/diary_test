import { Component } from '@angular/core';
import {DiaryService} from "../../services/diary.service";
import {Diary, DiaryText} from "../../diary";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent {
  constructor(private diaryService: DiaryService, private route: ActivatedRoute) {
  }
  diary: Diary = <Diary>{
    date: '',
    start_time: '',
    end_time: '',
    weather: '',
    title: '',
    text: '',
  }
  diary_text: DiaryText = {} as DiaryText;
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.diaryService.get(params['date']).subscribe((diary)=>{
        this.diary = diary
        this.diary_text = JSON.parse(this.diary.text) as DiaryText
        console.log('hello')
        // console.log(this.diary_text)
      }, (error)=>{
        alert(error)
      })
    },(error)=>{
      alert(error)
    })
  }


}
