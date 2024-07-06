import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-detail-page',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.css']
})
export class EventDetailPageComponent implements OnInit {

  event: any;
  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(eventId).subscribe(data => {
      this.event = data;
      console.log(this.event);
    });
  }

 

}

