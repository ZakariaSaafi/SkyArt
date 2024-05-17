import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var EventSchema = new Schema({

    title: {
        type: String,
        required: [true, 'Please provide title'],
    },
    fromDate: {
        type: Date,
        required: [true, "Please Insert The Start of your event" ],
        min: [new Date(), "can't be before now!!"],
       },
   /* endDate: {
        type: Date,
        //setting a min function to accept any date one hour ahead of start
        min: [function(){
          const date = new Date(this.start)
          const validDate = new Date(date.setHours(date.getHours()+1)) 
          return validDate
        },"Event End must be at least one hour a head of event time"],
       default: function(){
         const date = new Date(this.start)
         return date.setDate(date.getDate()+1)
       },
       },*/
    nbrAttendees: Number,
    isExpired: {
        type: Boolean,
        default: false
    },
    organizedBy: {
        type: String,
        default: 'SkyArt'
    },
    link: String,
    isPaid: {
        type: Boolean,
        required: [true, "Please check if the event is Paid or not"]
    },
},{timestamps: true});


export default mongoose.model('event', EventSchema);