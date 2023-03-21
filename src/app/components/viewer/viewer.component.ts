import {Component} from '@angular/core';
import {DiaryService} from "../../services/diary.service";
import {Diary} from "../../diary";
import {ActivatedRoute} from "@angular/router";
import {EditorjsData} from "../../editorjs-data";

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
  editorjsOutput: EditorjsData = {} as EditorjsData



  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.diaryService.get(params['date']).subscribe((diary) => {
        this.diary = diary
        this.editorjsOutput = JSON.parse(this.diary.text) as EditorjsData
        console.log(this.editorjsOutput.blocks)
        console.log(diary.text)
        // this.diary.text = ''
        // for (let block of editorjsOutput.blocks) {
        //   if (block.type == 'header') {
        //     this.diary.text += `<H${block.data.level}>${block.data.text}</H${block.data.level}>`
        //   } else if (block.type == 'paragraph') {
        //     this.diary.text += `<p>${block.data.text}<p>`
        //   }else if (block.type == 'list') {
        //     let tag = 'ul'
        //     if (block.data.style == 'ordered') {tag = 'ol'}
        //     let li = ''
        //     if (block.data.items){
        //       for (let l of block.data.items) {
        //         li += `<li>${l}</li>`
        //       }
        //     }
        //     this.diary.text += `<${tag}>${li}</${tag}>`
        //   } else if (block.type == 'image') {
        //     if (block.data.file) {
        //       this.diary.text += `<img src="${block.data.file.url}" alt="${block.data.caption}"/>`
        //       this.diary.text += `<p><small>${block.data.caption}</small></p>`
        //     }
        //   }
        // }
      }, (error) => {
        alert(error)
      })
    }, (error) => {
      alert(error)
    })
  }


}
