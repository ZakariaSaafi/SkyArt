import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-search-page',
  templateUrl: './event-search-page.component.html',
  styleUrls: ['./event-search-page.component.css']
})
export class EventSearchPageComponent implements OnInit {

  /*constructor(private http:HttpClient) {
    this.http.get('http://localhost:4040/event/events/').subscribe(data=>console.log(data))
  }
  ngOnInit(): void {
    
  }*/
  public events:any;
  public errorMsg:any;
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (data:any)=>{
        this.events = data;
        console.log(this.events);
      },error => {
        console.log(error);
        this.errorMsg  = error;
      }
    );
  }

}
  /*dataArray:any=[]
 
  dataEvent={
    title:'',
    fromDate:'',
    endDate:'',
    organizedBy:'',
    nbrAttendees:0,
    link:'',
    isPaid:'',
  }

  messageSuccess=''
  constructor(private ds:EventService,private route:Router) {
   
    this.ds.getEvents().subscribe(data=>{
      console.log(data)
      this.dataArray=Object.values(data)
    })
    
   }

  ngOnInit(): void {
  }*/


