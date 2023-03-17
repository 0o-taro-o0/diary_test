import { Injectable } from '@angular/core';
import {EditorjsData} from "../editorjs-data";
import {Diary, DiaryText} from "../diary";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import ImageTool from '@editorjs/image';
import {DiaryService} from "./diary.service";

@Injectable({
  providedIn: 'root'
})
export class EditorjsService {

  constructor(private diaryService: DiaryService) { }

  // エディタの初期化
  editor: any;
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
              byFile: `${this.diaryService.api_url}image/diary/editorjs/`,
            },
            additionalRequestData: {
              attached_to: diary.date,
              name: diary.title,
            }
          }
        }
      },
      data: this.importDiaryText(JSON.parse(diary.text) as DiaryText),
      onReady() {
        console.log('editor is ready');
      }
    })
  }
  // エディタのカスタマイズ
  exportDiaryText(outputData: EditorjsData) {
    let text: DiaryText = {elements: [{}]} as DiaryText;
    for (let i=0;i<outputData.blocks.length;i++) {
      let block = outputData.blocks[i]
      let t = {type: block.type, data: block.data as object}
      if (block.type === 'image') {
        if (block.data.file) {
          let u = block.data.file.url.split('/');
          let img_id = u[u.length - 2];
          t.data = {image_id: img_id, caption: block.data.caption};
        }
      }
      text.elements[i] = t;
    }
    return text;
  }
  importDiaryText(inputData: DiaryText) {
    let data: EditorjsData = {blocks: [{}]} as EditorjsData;
    data.time = 0;
    data.version = '2.26.5';
    let texts = inputData.elements
    for (let i = 0; i < texts.length; i++) {
      let t = texts[i]
      let d = {id: i.toString(), type: texts[i].type, data: t.data as object};
      if (t.type === 'image') {
        d.data = {
          file: {
            url: `${this.diaryService.api_url}image/diary/${t.data.image_id}/`
          },
          caption: t.data.caption,
          withBorder: false,
          stretched: false,
          withBackGround: true
        }
      }
      data.blocks[i] = d;
    }
    return data;
  }
  // 自動保存
    //使われない画像の削除

}
