import { Injectable } from '@angular/core';
import {EditorjsData} from "../editorjs-data";
import {Diary} from "../diary";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import ImageTool from '@editorjs/image';
import {DiaryService} from "./diary.service";
import {js2xml, xml2js} from "xml-js";
import {Element} from "@angular/compiler";

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
      data: JSON.parse(diary.text),
      onReady() {
        console.log('editor is ready');
      }
    })
  }
  // エディタのカスタマイズ
  // 自動保存
    //使われない画像の削除

}
