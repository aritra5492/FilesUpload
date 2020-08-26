import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AudioRecordingService } from './audio-recording.service';
import { WebSocketService } from './web-socket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AudioRecordingService, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
