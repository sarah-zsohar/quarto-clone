import React, {
    Component
} from 'react';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import io from 'socket.io-client'
let socket = io.connect();

// var allPieces=[0000,0001,0010,0011,0100,0101,0110,0111,1000,1001,1010,1011,1100,1101,1110,1111];
                                                        // var gameboard=[00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15]
class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionsPlayed:[],
            activePiece:[],
            unplayedPieces:['0000','0001','0010','0011','0100','0101','0110','0111','1000','1001','1010','1011','1100','1101','1110','1111'],
            gameboard:[{'square':'00'},{'square':'01'},{'square':'02'},{'square':'03'},{'square':'04'},{'square':'05'},{'square':'06'},{'square':'07'},{'square':'08'},{'square':'09'},{'square':'10'},{'square':'11'},{'square':'12'},{'square':'13'},{'square':'14'},{'square':'15'}],
            dragging:'',
            winner:'false'
        };
        this.checkGameForWin = this.checkGameForWin.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
        this.checkvertical=this.checkvertical.bind(this);
        this.checkHorizontal=this.checkHorizontal.bind(this);
        this.checkDiagnalToRight=this.checkDiagnalToRight.bind(this);
        this.checkDiagnalToLeft=this.checkDiagnalToLeft.bind(this);
        this.play=this.play.bind(this);
        this.dragtoBoard=this.dragtoBoard.bind(this);
        this.getState=this.getState.bind(this);
        this.alertWinner=this.alertWinner.bind(this)
        socket.on('updateGameboardPositions', (data) => this.getState(data));
        socket.on('win', () => this.setState({winner:'true'}));
    }
    checkGameForWin(){
        //checkHorizontal
    this.checkHorizontal();
    this.checkvertical();
    this.checkDiagnalToLeft();
    this.checkDiagnalToRight();
}
alertWinner(){
    console.log("winner");
    alert("WINNER")
}
getState(data){

     let s=JSON.parse(data.gameboard);
    //  let p = JSON.parse(data.unplayedPieces)

     this.setState({gameboard:s});
      this.setState({unplayedPieces:data.unplayedPieces});
}
checkHorizontal(){
for (let r = 0; r < 4; r++) {
    let bits=[[],[],[],[]];
    for (let i = (1+(r*4)); i < (5+(r*4)); i++) {
        let temp=i-1;

        if(typeof(this.state.gameboard[temp]["piecePlayed"])=="undefined"){
            return;
        }
        let pieceBits = this.state.gameboard[temp]["piecePlayed"].split('');
        bits[0].push(pieceBits[0]);
        bits[1].push(pieceBits[1]);
        bits[2].push(pieceBits[2]);
        bits[3].push(pieceBits[3]);

        if (bits[0].length==4) {

            for (var j = 0; j < 4; j++) {
                if((bits[j][0] & bits[j][1] & bits[j][2] & bits[j][3]) == 1 || (bits[j][0] | bits[j][1] | bits[j][2] | bits[j][3]) == 0  ){
                    socket.emit('winner')
                    return;
                }
            }
        }
    }

}
}
checkDiagnalToRight(){
        let bits=[[],[],[],[]];
    for (let i = 0; i < 16; i=i+5) {
        let temp=i;

        if(typeof(this.state.gameboard[temp]["piecePlayed"])=="undefined"){
            return;
        }
            let pieceBits = this.state.gameboard[temp]["piecePlayed"].split('');
            bits[0].push(pieceBits[0]);
            bits[1].push(pieceBits[1]);
            bits[2].push(pieceBits[2]);
            bits[3].push(pieceBits[3]);

        if (bits[0].length==4) {

            for (var j = 0; j < 4; j++) {
                if((bits[j][0] & bits[j][1] & bits[j][2] & bits[j][3]) == 1 || (bits[j][0] | bits[j][1] | bits[j][2] | bits[j][3]) == 0  ){
                    socket.emit('winner')
                    return;
                }
            }
        }
}

}
checkDiagnalToLeft(){
        let bits=[[],[],[],[]];
    for (let i = 3; i < 13; i=i+3) {
        let temp=i;
        if(typeof(this.state.gameboard[temp]["piecePlayed"])=="undefined"){
            return;
        }
            let pieceBits = this.state.gameboard[temp]["piecePlayed"].split('');
            bits[0].push(pieceBits[0]);
            bits[1].push(pieceBits[1]);
            bits[2].push(pieceBits[2]);
            bits[3].push(pieceBits[3]);

        if (bits[0].length==4) {
            for (var j = 0; j < 4; j++) {
                if((bits[j][0] & bits[j][1] & bits[j][2] & bits[j][3]) == 1 || (bits[j][0] | bits[j][1] | bits[j][2] | bits[j][3]) == 0  ){
                    socket.emit('winner')
                    return;
                }
            }
        }
}

}
checkvertical(){

    for (let r = 0; r < 4; r++) {
        let bits=[[],[],[],[]];

        for (let i = r; i < (13+r); i=i+4) {
            let temp=i;

            if(typeof(this.state.gameboard[temp]["piecePlayed"])=="undefined"){


                return;
            }
                let pieceBits = this.state.gameboard[temp]["piecePlayed"].split('');
                bits[0].push(pieceBits[0]);
                bits[1].push(pieceBits[1]);
                bits[2].push(pieceBits[2]);
                bits[3].push(pieceBits[3]);

            if (bits[0].length==4) {
                for (var j = 0; j < 4; j++) {
                    if((bits[j][0] & bits[j][1] & bits[j][2] & bits[j][3]) == 1 || (bits[j][0] | bits[j][1] | bits[j][2] | bits[j][3]) == 0  ){
                        socket.emit('winner')
                        return;
                    }
                }
            }
    }

    }
}
    play(ev) {
      ev.preventDefault();
      let square=ev.target.id;
      let i= this.state.gameboard.findIndex(i=> i.square == square);
      let piecePlayed=this.state.dragging;
      var update = this.state.unplayedPieces.slice();
      update.splice(update.indexOf(piecePlayed),1);
      this.setState({unplayedPieces:update});

      this.state.gameboard[i]["piecePlayed"]=piecePlayed;
      let gameboardState= JSON.stringify(this.state.gameboard);

      this.checkGameForWin();

      socket.emit('updateGameboard', {
          gameboard: gameboardState,
          unplayedPieces: update
      });
  }
    dragtoBoard(e){
        e.dataTransfer.setData("text/html", e.target.id)
        this.setState({
            dragging:e.target.id
        })
    }
    allowDrop(ev) {
        ev.preventDefault();
   }

    render() {
        console.log(this.state.winner);
        let winnerPopup;
        if (this.state.winner=="true") {
            winnerPopup=<div id="winner-popup">Winner!</div>
        }else {
             winnerPopup=null;
        }
        let unplayed = this.state.unplayedPieces.map((piece, index) => {
            return(<div className="tracker" key={index} id={piece} draggable='true' onDragStart={this.dragtoBoard} >{piece}</div>)
        });
        let gameboard=this.state.gameboard.map((square, index)=>{
            if (square["piecePlayed"]) {
                return(<div className="square" id={square["square"]} key ={index} >
                        <div className="tracker" key={index} id={square["piecePlayed"]} style = {{margin: "auto", position: "absolute", float: "none"}} >{square["piecePlayed"]}</div>
                       </div>)
            }else{
                return(<div className="square" id={square["square"]} key ={index} s onDrop={this.play.bind(this)} onDragOver={this.allowDrop.bind(this)}></div>)
            }
        });
        return(
            <div>
            <div style={{width:"25%", margin:"auto"}}>
            {gameboard}

            </div>
            <div>

            {unplayed}
            {winnerPopup}
            </div>
            </div>
        );
    }
}

export default Parent
