var curPlayer = 'kitty';


$(document).ready(function(){

    $("#container").mousemove(function(e) {
        if (curPlayer == 'kitty') {
            $(".kittyPointer").css('display', 'block');
            $(".kittyPointer").css('top', + (e.clientY - 50));
            $(".kittyPointer").css('left', + (e.clientX - 50));
        } else {
            $(".unicornPointer").css('display', 'block');
            $(".unicornPointer").css('top', + (e.clientY - 50));
            $(".unicornPointer").css('left', + (e.clientX - 50));
        }
    });


    $(".column").click(function play(e) {


        var slotsInColumn = $(e.currentTarget).find('.slot')
        //Get the descendants of each element in the current set of matched elements
        for (var i=5; i >=0; i--) {
            if (!slotsInColumn.eq(i).hasClass('kitty') && !slotsInColumn.eq(i).hasClass('unicorn')) {
                slotsInColumn.eq(i).addClass(curPlayer);

                console.log("checking for victory...")

                if (checkForVictory(slotsInColumn)) { //check for vertical win
                    console.log("victory for: " + curPlayer);
                    setTimeout(victoryMessage, 111);
                    return;

                } else {
                    console.log("keep playing")
                    var slotsInRow = $('.row' + i)
                }

                if (checkForVictory(slotsInRow)) { //check for horizontal win
                    console.log("victory for: " + curPlayer);
                    setTimeout(victoryMessage, 111);
                    return;
                } else {
                    console.log("keep playing")
                }

                if (checkForDiagVictory(slotsInColumn.eq(i), i)) {
                    console.log("victory for: " + curPlayer);
                    setTimeout(victoryMessage, 111);
                    return;
                } else {
                    console.log("keep playing")
                }

                console.log("change players now!")



                switchPlayers();

                break;
            }
        }
    });
});




function checkForDiagVictory(slot, row) {
    var downRight = [
        slot.closest('.column').prev().prev().prev().find('.slot').eq(row - 3),
        slot.closest('.column').prev().prev().find('.slot').eq(row - 2),
        slot.closest('.column').prev().find('.slot').eq(row - 1),
        slot,
        slot.closest('.column').next().find('.slot').eq(row + 1), //returns closest parent w the class column
        slot.closest('.column').next().next().find('.slot').eq(row + 2),
        slot.closest('.column').next().next().next().find('.slot').eq(row + 3),
    ]
    var upRight = [
        slot.closest('.column').prev().find('.slot').eq(row + 1),
        slot.closest('.column').prev().prev().find('.slot').eq(row + 2),
        slot.closest('.column').prev().prev().prev().find('.slot').eq(row + 3),
        slot,
        slot.closest('.column').next().next().next().find('.slot').eq(row - 3),
        slot.closest('.column').next().next().find('.slot').eq(row - 2),
        slot.closest('.column').next().find('.slot').eq(row - 1),
    ]
    var str1 = '';
    for (var i = 0; i < 7; i++) {
        if (downRight[i].hasClass(curPlayer)) {
            str1 += 'y';
        } else {
            str1 += 'n'
        }
    }
    var str2 = '';
    for (var i = 0; i < 7; i++) {
        if (upRight[i].hasClass(curPlayer)) {
            str2 += 'y';
        } else {
            str2 += 'n'
        }
    }
    if (str1.includes('yyyy')) {
        for (var i=0; i < 7; i++) {
            if (downRight[i].hasClass(curPlayer)) {
                downRight[i].addClass("highlight");
            }
        }
        return true;
    }
    if (str2.includes('yyyy')) {
        for (var i=0; i < 7; i++) {
            if (upRight[i].hasClass(curPlayer)) {
                upRight[i].addClass("highlight");
            }
        }
        return true;
    }
    // return (str1.includes('yyyy') || str2.includes('yyyy'))
}



function victoryMessage() {
    // $(".kittyPointer").css('display', 'none');
    // $(".unicornPointer").css('display', 'none');
    var nyancat = document.getElementsByTagName("audio")[0];
    nyancat.play();
    setTimeout(function() {
        if (curPlayer == 'kitty') {
            alert("Kitties rule the Universe! Meowwwwwww!")
            location.reload();
        } else {
            // var horse = document.getElementsByTagName("audio")[1];
            // horse.play();
            alert("Unicorns for the win!")
            location.reload();
        }
    }, 666)
}


function checkForVictory(slots) {
    var str = '';
    for (var i=0; i<slots.length; i++) {
        if (slots.eq(i).hasClass(curPlayer)) {
            str += 'y';
        } else {
            str += 'n'
        }
    }
    if (str.includes('yyyy')) {
        for (var i=0; i<slots.length; i++) {
            if (slots.eq(i).hasClass(curPlayer)) {
                slots.eq(i).addClass("highlight");
            }
        }
        return true;
    }
}

function switchPlayers () {
        console.log("changin players...")
    if (curPlayer == 'kitty') {
        $(".kittyPointer").css('display', 'none');
        curPlayer = 'unicorn';
        console.log("current player: " + curPlayer)
    } else {
        $(".unicornPointer").css('display', 'none');
        curPlayer = 'kitty';
        console.log("current player: " + curPlayer)

    }
}
