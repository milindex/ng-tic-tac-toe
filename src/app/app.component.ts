import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(){}

  click = new Array(9)
  clickCount: number = 0

  nonFaded :number[] = []

  restartGame: boolean = false
  currentPlayer: number = 1
  winner: number = 0
  tie: boolean = false

  playerOneScore: number = 0
  playerTwoScore: number = 0
  tieScore: number = 0

  winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  ngOnInit(): void {
    // console.log(this.click);
  }

  handleClick($event: any ): void{
    try {
      let index: number = $event.attributes['data-index'].value
      let currentPlayer = this.currentPlayer
      if(this.currentPlayer == 1){
        this.click[index] = 'x'
        this.currentPlayer = 2
      }
      else{
        this.click[index] = 'o'
        this.currentPlayer = 1
      }
      this.checkWinner(currentPlayer)
      this.clickCount++
    } catch (error) {
      alert('This one is already selected, try other one')
    }
  }

  checkWinner(player: number): void{
    let type: string = player == 1 ? 'x' : 'o'
    for ( let winningArray of this.winningConditions) {
      if(   ( type == this.click[winningArray[0]] )
        &&  (this.click[winningArray[0]] == this.click[winningArray[1]])
        &&  (this.click[winningArray[1]] == this.click[winningArray[2]])
        &&  (this.click[winningArray[0]] == this.click[winningArray[2]])
      ){
        this.nonFaded = [ winningArray[0], winningArray[1], winningArray[2] ]
        player == 1 ? (this.playerOneScore++) : (this.playerTwoScore++)
        this.winner = player
        this.currentPlayer = player // Override to current player
        this.restartGame = true
        continue;
      }
      else{
        console.log(this.clickCount);
        if( this.clickCount == 9){
          if( this.tie == false ){
            this.winner = 0
            this.tie = true;
            this.tieScore++
            this.restartGame = true
          }
        }
        continue;
      }
    }
  }

  continueOrReset(type: string): void{
    this.click = new Array(9)
    this.clickCount = 0
    this.winner = 0
    this.currentPlayer = this.currentPlayer == 1 ? 2 : 1
    this.tie = false
    this.restartGame = false
    if( type == 'reset' ){
      this.click = new Array(9)
      this.playerOneScore = 0
      this.playerTwoScore = 0
      this.tieScore = 0
      this.currentPlayer = 1
    }
    // console.log('Restarting Game!')
  }
}
