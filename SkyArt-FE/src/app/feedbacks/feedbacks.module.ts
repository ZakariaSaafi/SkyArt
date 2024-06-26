import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbacksRoutingModule } from './feedbacks-routing.module';
import { ChatComponent } from './chat/chat.component';
import {FormsModule} from "@angular/forms";
import { AdminChatComponent } from './admin-chat/admin-chat.component';



@NgModule({
  declarations: [
    ChatComponent,
    AdminChatComponent,

  ],
  imports: [
    CommonModule,
    FeedbacksRoutingModule,
    FormsModule
  ]
})
export class FeedbacksModule { }
