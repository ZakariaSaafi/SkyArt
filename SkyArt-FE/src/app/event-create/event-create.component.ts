import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventServiceService } from 'src/services/event-service.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
})
export class EventCreateComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventServiceService
  ) {}

  ngOnInit(): void {
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

  createEvent(): void {
    if (this.eventForm.valid) {
      this.eventService.addEvent(this.eventForm.value).subscribe(
        () => {
          console.log('Event created successfully');
          this.router.navigate(['/events-search-page']);
        },
        (error) => {
          console.error('Error creating event:', error);
        }
      );
    }
  }
}
