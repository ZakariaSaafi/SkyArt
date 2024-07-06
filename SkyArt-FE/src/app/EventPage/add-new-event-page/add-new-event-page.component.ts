import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service'; // Assuming you create an EventService
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-event-page',
  templateUrl: './add-new-event-page.component.html',
  styleUrls: ['./add-new-event-page.component.css']
})
export class AddEventComponent implements OnInit {
  messageErr=""
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  add(f:any){
    let data=f.value
     console.log(data)
    this.eventService.getEvents().subscribe(response=>{
       console.log(response)
    },(err:HttpErrorResponse)=>{
      this.messageErr=err.error
       console.log(err.error)
       console.log(err.status)
    })
  }

}
