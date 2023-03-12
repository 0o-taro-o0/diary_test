import {Component, Injectable} from '@angular/core';
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import List from '@editorjs/list';

// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import ImageTool from '@editorjs/image';
import {DiaryService} from "../services/diary.service";
import {Diary} from "../diary";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-editorjs',
  templateUrl: './editorjs.component.html',
  styleUrls: ['./editorjs.component.css']
})
export class EditorjsComponent {
  constructor(private diaryService: DiaryService, private route: ActivatedRoute) {
  }
  diary: Diary = <Diary>{
    date: '',
    start_time: '',
    end_time: '',
    weather: '',
    title: '',
    text: ''
  }
  editor: any;
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.diaryService.get(params['date']).subscribe((diary)=>{
        this.diary = diary;
        this.setupEditor(this.diary);
      })
    })


  }
  onSave() {
    this.editor
      .save()
      .then((outputData: Object) => {
        this.diary.text = JSON.stringify(outputData)
        this.diaryService.put(this.diary).subscribe((response)=>{
          console.log(response)
        });
      })
      .catch((error: Object) => {
        console.log('Saving failed: ', error);
      });
    console.log(this.diary)
  }
  onLoad(diary: Diary) {
    this.editor.render(JSON.parse(diary.text))
  }
  setupEditor(diary: Diary) {
    this.editor = new EditorJS({
      holder: 'editor-js',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        },
        list: {
          class: List,
          inlineToolbar: ['link', 'bold']
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:8000/api/image/diary/',
            }
          }
        }
      },
      data: JSON.parse(diary.text),
      onReady() {
        console.log('editor is ready');
      }
    })
  }

}
