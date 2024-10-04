import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppComponent } from './app.component';
import { SeatComponent } from './seat/seat.component';
import { SeatService } from './seat.service';

@NgModule({
  declarations: [
    AppComponent,
    SeatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule 
  ],
  providers: [SeatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
