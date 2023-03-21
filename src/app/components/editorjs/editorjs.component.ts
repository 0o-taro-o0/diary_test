import {Component, Injectable} from '@angular/core';
import EditorJS from "@editorjs/editorjs";
import {DiaryService} from "../../services/diary.service";
import {Diary} from "../../diary";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {EditorjsService} from "../../services/editorjs.service";
import {EditorjsData} from "../../editorjs-data";


@Component({
  selector: 'app-editorjs',
  templateUrl: './editorjs.component.html',
  styleUrls: ['./editorjs.component.css']
})
export class EditorjsComponent {
  constructor(
    private diaryService: DiaryService,
    private route: ActivatedRoute,
    private editorjsService: EditorjsService,
    private router: Router,
  ) {
  }
  diary: Diary = <Diary>{
    date: '',
    start_time: '',
    end_time: '',
    weather: '',
    title: '',
    text: JSON.stringify({time: 0, blocks: [], version: '2.26.5'})
  }
  urlDate: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      if (params['date']) {
        console.log('here')
        this.urlDate = params['date']
        this.diaryService.get(params['date']).subscribe((diary)=>{
          this.diary = diary;
          this.editorjsService.setupEditor(this.diary);
        }, (error)=>{
            console.error(error)
        })
      } else {
        this.editorjsService.setupEditor(this.diary);
      }
    })
  }
  onSave() {
    this.editorjsService.editor
      .save()
      .then((outputData: EditorjsData) => {
        this.diary.text = JSON.stringify(outputData)
        console.log(this.diary.text)
        if (this.urlDate != '') {
          this.diaryService.put(this.diary).subscribe((response)=>{
            console.log(response)
            this.router.navigate([`/viewer/${this.diary.date}`])
          }, (error)=>{
            alert('failed to put data')
          });
        } else {
          this.diaryService.post(this.diary).subscribe((response)=>{
            console.log(response)
            this.router.navigate([`/viewer/${this.diary.date}`])
          }, (error)=>{
            alert('failed to post data')
          });
        }
      })
      .catch((error: Object) => {
        console.log('Saving failed: ', error);
      });
  }
  onLoad(diary: Diary) {
    this.editorjsService.editor.render(JSON.parse(diary.text))
  }


}
