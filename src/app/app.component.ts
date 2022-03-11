import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(){}

  click = ['','','','','','','','','']

  winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  currentPlayer: number = 1;

  playerOneScore: number = 0;
  playerTwoScore: number = 0;

  ngOnInit(): void {
    console.log(this.click);
  }

  handleClick($event: any ): void{
    try {
      let index: number = $event.attributes['data-index'].value
      let currentPlayer = this.currentPlayer
      if(this.currentPlayer == 1){
        this.click[index] = 'x';
        this.currentPlayer = 2
      }
      else{
        this.click[index] = 'o';
        this.currentPlayer = 1
      }
      this.checkWinner(currentPlayer)
    } catch (error) {
      alert('This one is already selected, try other one')
    }
  }

  checkWinner(player: number): void{
    console.log(player);
    console.log(this.click.length);

    // if( this.click.length == 9 ){
    //   alert('All slots filled')
    // }
  }
}
