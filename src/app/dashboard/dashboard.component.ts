import {Component, Inject} from '@angular/core';
import {Diary} from "../diary";
import {DiaryService} from "../services/diary.service";
import {ImageService} from "../services/image.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  diaries: Diary[] = []
  image: string = ''
  constructor(private diaryService: DiaryService) {
  }
  ngOnInit(): void {
    this.diaryService.list().subscribe(diaries=>{
      this.diaries = diaries.reverse()
    },
      error => {}

    );
    const today = new Date()
    this.diaryService.list({
      range: `:${today.toISOString().split('T')[0]}`,
      month: today.getMonth()+1,
      day: today.getDate()
    }).subscribe(diaries=>{
      this.same_date_diaries = diaries.reverse()
    })

  }
  same_date_diaries: Diary[] = []


}
