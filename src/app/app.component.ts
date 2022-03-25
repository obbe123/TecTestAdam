import { Component } from '@angular/core';
import { ApiService } from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //I wish there was a better solution
  dataSet = [{}];
  dataSetIndex = 0;
  pageLoading = false;
  img='';
  imgTitle='XKCD comics';
  //Extra stuff
  interval: any;
  slideShowActive = false;
  timeLeft: number = 5;
  subscribeTimer: any;
  constructor(private api: ApiService) {
  }

   getData() {
    let randomNum = Math.floor(Math.random() * (999 - 0 + 1)) + 0;
    this.api.getData(randomNum).subscribe(async data => {
      let holder = await data;
      this.img=holder.img;
      this.imgTitle=holder.title;
      this.dataSet.push(holder);
      this.dataSetIndex = this.dataSet.length-1;
      this.pageLoading = false;
     
    })
  }

   getPrevImg(){
    let holder : any = {};
    this.dataSetIndex--;
    holder = this.dataSet[this.dataSetIndex];
    this.imgTitle = holder.title;
    this.img = holder.img;
    this.pageLoading = false;
  }

   startSlideshow() {
     if(!this.interval)
     {
     this.pageLoading = true;
     this.getData();
     }
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 5;
        this.pageLoading = true;
        this.getData();
      }
    },1000)
  }

  pauseSlideshow() {
    clearInterval(this.interval);
  }

  // Left this in for discussion.
  // toggleSpinner(style:string){
  //   let spinner = document.getElementById('spinner');
  //   if(spinner)
  //   {
  //       spinner.style.display = style;
  //   }
  // }
}




 


