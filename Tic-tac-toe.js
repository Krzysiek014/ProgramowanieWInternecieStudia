var firstPlayer = true;
var board_enabled = false;
var score = [0,0,0, 0,0,0, 0,0,0];
var id = ["ttt-one","ttt-two","ttt-three","ttt-four","ttt-five","ttt-six","ttt-seven","ttt-eight","ttt-nine"];
var aiGameMode = false;

window.onload = function(){
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if(isIE){
        document.getElementById('ttt-board').style.display = '-ms-grid';
        document.getElementById('ttt-two').style['-ms-grid-column'] = '2';
        document.getElementById('ttt-three').style['-ms-grid-column'] = '3';
        document.getElementById('ttt-four').style['-ms-grid-row'] = '2';
        document.getElementById('ttt-five').style['-ms-grid-column'] = '2';
        document.getElementById('ttt-five').style['-ms-grid-row'] = '2';
        document.getElementById('ttt-six').style['-ms-grid-column'] = '3';
        document.getElementById('ttt-six').style['-ms-grid-row'] = '2';
        document.getElementById('ttt-seven').style['-ms-grid-row'] = '3';
        document.getElementById('ttt-eight').style['-ms-grid-column'] = '2';
        document.getElementById('ttt-eight').style['-ms-grid-row'] = '3';
        document.getElementById('ttt-nine').style['-ms-grid-row'] = '3';
        document.getElementById('ttt-nine').style['-ms-grid-column'] = '3';
        

    }
}

function addCross(el){
    src = document.getElementById(el);

    Xelem = document.createElement('div');
    XelemV = document.createElement('div');
    XelemH = document.createElement('div');
    Xelem.classList.add('ttt-cross');
    XelemV.classList.add('ttt-cross-vert');
    XelemH.classList.add('ttt-cross-hor');

    Xelem.appendChild(XelemH);
    Xelem.appendChild(XelemV);
    src.appendChild(Xelem);
}

function addCircle(el){
    src = document.getElementById(el);

    Xelem = document.createElement('div');
    Xelem.classList.add('ttt-circle');

    src.appendChild(Xelem);
}

function addFigure(el){
    playerTurn = document.getElementById('player-turn');
    if(!document.getElementById(el).classList.contains('filled') && board_enabled){
        if(firstPlayer || aiGameMode){
            addCross(el);
            playerTurn.innerHTML = 'Ruch gracza 2';
            score[id.indexOf(el)] = 1;
            if(aiGameMode){
                if(end_game()==0){
                    document.getElementById(el).classList.add('filled')
                    el = aiMove();
                    addCircle(el);
                    playerTurn.innerHTML = 'Ruch gracza 1';
                    score[id.indexOf(el)] = 2;
                }
            }
        }else{
            addCircle(el);
            playerTurn.innerHTML = 'Ruch gracza 1';
            score[id.indexOf(el)] = 2;
        }
        document.getElementById(el).classList.add('filled')
        firstPlayer = !firstPlayer
        end_game();
    }
}

function mark_red(a, b, c){
    document.getElementById(id[a]).style.backgroundColor = 'green';
    document.getElementById(id[b]).style.backgroundColor = 'green';
    document.getElementById(id[c]).style.backgroundColor = 'green';
}

function score_verify(){
    for(i=0; i<9; i+=3){
        if(score[i]==score[i+1] && score[i+1]==score[i+2]){
            if(score[i]==1){
                mark_red(i, i+1, i+2)
                return 1
            }else if(score[i]==2){
                mark_red(i, i+1, i+2)
                return 2
            }
        }
    }
    for(i=0; i<3; i+=1){
        if(score[i]==score[i+3] && score[i+3]==score[i+6]){
            if(score[i]==1){
                mark_red(i, i+3, i+6)
                return 1
            }else if(score[i]==2){
                mark_red(i, i+3, i+6)
                return 2
            }
        }
    }
    if(score[0]==score[4] && score[4]==score[8]){
        if(score[0]==1){
            mark_red(0, 4, 8)
            return 1
        }else if(score[0]==2){
            mark_red(0, 4, 8)
            return 2
        }
    }
    if(score[2]==score[4] && score[4]==score[6]){
        if(score[2]==1){
            mark_red(2, 4, 6)
            return 1
        }else if(score[2]==2){
            mark_red(2, 4, 6)
            return 2
        }
    }
    count_filled = 0
    for(i=0; i<score.length; i++)
        if(score[i]>0) count_filled++;

    if(count_filled == 9)
        return 3;
}

function end_game(){
    playerTurn = document.getElementById('player-turn');
    score_verify_value = score_verify()
    if(score_verify_value==1){
        playerTurn.innerHTML = 'Wygra?? gracz 1';
    }else if(score_verify_value==2){
        playerTurn.innerHTML = 'Wygra?? gracz 2';
    }else if(score_verify_value==3){
        playerTurn.innerHTML = 'Remis';
    }
    if(score_verify_value>0){
        board_enabled = false;
        document.getElementById('new-game-content').style.visibility = 'visible';
        return 1;
    }
    return 0;
}

function clearBoard(mode){
    score = [0,0,0, 0,0,0, 0,0,0];
    board_enabled = true;
    firstPlayer = true;
    document.getElementById('player-turn').innerHTML = 'Ruch gracza 1';
    document.getElementById('new-game-content').style.visibility = 'hidden'
    for(i=0;i<id.length;i++){
        field = document.getElementById(id[i]);
        field.style.backgroundColor = '';
        field.innerHTML = '';
        field.classList.remove('filled');
    }
    if(mode==1){
        aiGameMode = true;
    }else{
        aiGameMode = false;
    }
}

function aiMove(){
    randomField = Math.floor(Math.random() * 9);
    while(score[randomField]!=0){
        randomField = Math.floor(Math.random() * 9);
    }
    return id[randomField];
}