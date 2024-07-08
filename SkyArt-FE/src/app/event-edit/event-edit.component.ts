import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventServiceService } from 'src/services/event-service.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
})
export class EventEditComponent implements OnInit {
  eventForm: FormGroup;
  event: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventServiceService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      fromDate: ['', Validators.required],
      endDate: ['', Validators.required],
      nbrAttendees: [0, Validators.required],
      organizedBy: ['', Validators.required],
      link: [''],
      isPaid: [false],
    });
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEvent(eventId);
    }
  }

  loadEvent(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe((data: any) => {
      this.event = data; // Assign data to the event property
      this.eventForm.patchValue(this.event); 
    });
  }

  updateEvent(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventForm.valid) {
      this.eventService.updateEvent(eventId, this.eventForm.value).subscribe(
        () => {
          console.log('Event updated successfully');
          this.router.navigate(['/events-search-page']);
        },
        (error) => {
          console.error('Error updating event:', error);
        }
      );
    }
  }
}
