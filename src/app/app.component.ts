import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(){}

  click = new Array(9).fill(null)
  clickCount: number = 0

  nonFaded :number[] = [] // For de-fading the winning condition Visually (Using CSS)

  restartGame: boolean = false
  currentPlayer: number = 1
  winner: number = 0
  tie: boolean = false

  playerOneScore: number = 0
  playerTwoScore: number = 0
  tieScore: number = 0

  // Conditions to match for player to be a winner
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

    // Handle clicks and sequnce the functions
  handleClick($event: any ): void{
    try {
      this.addClicks()
      let index: number = $event.attributes['data-index'].value // get squareBox index (0-8)
      this.playerActions(index)
    } catch (error) {
      alert('This one is already selected, try other one')
    }
  }

  // Handle actions
  playerActions(index: number): void{
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
  }

  // Check if we have a winner !
  checkWinner(player: number): void{
    if( this.clickCount >= 5 || this.clickCount <= 9 ){
      // declare type (x | o) to match conditions with winning array
      let type: string = player == 1 ? 'x' : 'o'
      for ( let winningArray of this.winningConditions) {
        if(   ( type == this.click[winningArray[0]] ) &&
        (this.click[winningArray[0]] === this.click[winningArray[1]]) &&
        (this.click[winningArray[0]] === this.click[winningArray[2]]) ){
          this.winner = player // We have a winner !
          player == 1 ? (this.playerOneScore++) : (this.playerTwoScore++) // +1 the score of winning player
          this.restartGame = true // set Restart Flag to true
          this.nonFaded = [ winningArray[0], winningArray[1], winningArray[2] ] // Will be used to highlight winning x|o line visually
          this.currentPlayer = player // Override to current player
          continue; // Get out of loop !
        }
      }
    }
    if( this.clickCount == 9 ){ // only when click count reaches 9
      this.checkTie(player)
    }
  }

  // Check whether it's a tie
  checkTie(player: number): void{
    if( this.tie == false && this.winner == 0){
      this.tie = true;
      this.tieScore++
      this.currentPlayer = player // Override to current player
      this.restartGame = true
    }
  }

  // Handle Continue & reset game actions
  continueOrReset(type: string): void{
    this.click = new Array(9)
    this.clickCount = 0
    this.winner = 0
    this.currentPlayer = this.currentPlayer == 1 ? 2 : 1
    this.tie = false
    this.nonFaded = []
    this.restartGame = false
    if( type == 'reset' ){
      this.click = new Array(9)
      this.playerOneScore = 0
      this.playerTwoScore = 0
      this.tieScore = 0
      this.currentPlayer = 1
    }

  }

  // Increment clicks when called
  addClicks(): void{
    this.clickCount++
  }
}
