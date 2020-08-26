import { Component, OnInit } from '@angular/core';
import { AudioRecordingService } from './audio-recording.service';
import { DomSanitizer } from '@angular/platform-browser';
import { WebSocketService } from './web-socket.service';
import * as hark from './../assets/hark/hark';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  hark: any;
  isRecording = false;
  recordedTime;
  blobUrl;
  // speechEvents = hark(this.audioRecordingService.stream, {})

  constructor(
    private audioRecordingService: AudioRecordingService, 
    private sanitizer: DomSanitizer, 
    private _webSocketService: WebSocketService,
    ) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this._webSocketService.emit('audio-event', data.blob);
    });

    // this.speechEvents.on('stopped_speaking', function() {
    //   this.stopRecording();
    // })
  }

  ngOnInit(){
    this.startRecording()
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
      this.checkForSilence();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  checkForSilence(){
    this.stopRecording();
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }
}
