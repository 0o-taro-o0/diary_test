import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RouterModule, Routes} from "@angular/router";
import {EditorjsComponent} from "./components/editorjs/editorjs.component";
import {ViewerComponent} from "./components/viewer/viewer.component";


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'editor/:date', component: EditorjsComponent},
  {path: 'editor', component: EditorjsComponent},
  {path: 'viewer/:date', component: ViewerComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
