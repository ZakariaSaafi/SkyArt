import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventServiceService } from 'src/services/event-service.service';

@Component({
  selector: 'app-event-search-page',
  templateUrl: './event-search-page.component.html',
  styleUrls: ['./event-search-page.component.css'],
})
export class EventSearchPageComponent implements OnInit {
  events: any[] = [];

  constructor(
    private eventService: EventServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.eventService.getEvents().subscribe(
      (data: any) => {
        this.events = data.event;
        console.log(this.events);
        console.log(data);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  deleteEvent(id: any) {
    this.eventService.deleteEvent(id).subscribe(
      () => {
        this.fetchEvents();
      },
      (error) => {
        console.error('Error deleting event:', error);
      }
    );
  }
  updateEvent(event: any) {
    this.router.navigate(['/events', event._id]);
  }
  goToCreateEvent(): void {
    this.router.navigate(['/addevent']);
  }
  detailEvent(event: any): void {
    this.router.navigate(['event-detail-page/',event._id]);
  }
}
