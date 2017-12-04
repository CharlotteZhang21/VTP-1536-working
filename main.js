var inactive = true;


function handAni(e, d) {
    var tl = new TimelineMax({
        repeat: 10,
        repeatDelay: .5
    });


    tl.to(
        e, .8, {
            y: -80,
            delay: d,
            ease: Expo.easeInOut
        });
    tl.fromTo(
        e, .4, {
            opacity: 1
        }, {
            opacity: 0,
            ease: Quad.easeInOut
        });


}

function endScreen() {
    var topValue = "20%";
    if (orientationCheck() == "landscape") {
        topValue = "5%";
    }
    TweenMax.to(".billboard", .6, {
        top: topValue,
        delay: .2
    }, 1);


    TweenMax.to($('#youwon'), .6, {
        opacity: 1,
        delay: .5
    }, 1);
    setTimeout(function() {
        TweenMax.to(".endScreen", 0.5, { opacity: '1', display: "block" }, 1);
        TweenMax.to($('#prizeBoard'), 0.5, {opacity: '0'}, 1);
        $('#vungle-cta').addClass('pulse');
        $('#vungle-cta').html('COLLECT <span class="footer" data-icon="j"></span>');
        $('#youwon').addClass('end');
        $('#endAnimationContainer').addClass('end');
    }, 2000);
    $('.gameScreen').fadeOut();

}

function removeSelected() {
    $('.selected').removeClass('selected');
    removeLock();
}

function removeLock() {
    $('.tile').removeClass('lock');
}


var tiles = document.getElementsByClassName('tiles');


//fly the numbers to the goal
function fly(num) {
    console.log(num);
    removeLock();
    var el = [];
    $("div:data(num)").each(function() {
        var element = $(this);
        if(element.data( "num" ) == num){
            var text = element.children(".tileText");

            el.push(text);

            var moveL = $(window).width()/2 - $(this).offset().left;
            var moveT = $(window).height()/3 - $(this).offset().top;
                
            if (orientationCheck() == "landscape") 
                moveL = $(window).width()/4 - $(this).offset().left;
            
            
            TweenLite.to(text, .5, {
                scale: 0,
                top: moveT,
                left: moveL,
                delay: .3,
                ease: CustomEase.create("custom", "M0,0,C0.152,0.106,0.746,0.254,1,1"),
                onComplete: function() {

                    var final = $('#finalNumber');
                    final.html(num + 'x');
                    final.css("opacity", 1);
                    TweenMax.to(final, .3, {
                        scale: 1.5,
                        delay: 1
                    })
                    var finalT = $('#multi').offset().top;

                    console.log(" T: " + finalT);
                    TweenLite.to(
                        final, .5, {
                            top: finalT,
                            scale: .1,
                            delay: 1,
                            ease: CustomEase.create("custom", "M0,0,C0.152,0.106,0.746,0.254,1,1"),
                            onComplete: function() {
                                // $('.selected').css('background', "").removeClass('selected');
                                setTimeout(function(){
                                    $("#multi").html(num);
                                    final.css("opacity", 0);
                                }, 500)

                                TweenMax.to($("#multi"), .3, {
                                    opacity: 1,
                                });

                                TweenMax.to(final, .3, {
                                    opacity: 0,
                                    onComplete: function() {
                                        var wonTotal = num * $('#bet').html();
                                        $('#finalPrize').html(wonTotal);
                                        $('#youwon').html(wonTotal);

                                        console.log("you won: " + wonTotal);

                                        TweenMax.to($('#finalPrize'), .3, {
                                            scale: 1,
                                            opacity: 1,
                                            delay: .5,
                                            onComplete: function() {
                                                endScreen();
                                            }
                                        })
                                        

                                    }
                                });
                                


                            }
                    });
                }
            });

            
        }

        if(!element.hasClass("lock"))
            element.addClass("lock");
        setTimeout(function() {
            if(!element.hasClass('selected'))
                addSelected(element);       
        },2000);


    })


}

function addSelected(element){
    TweenMax.to(element, .3, {
        scaleX:1, 
        scaleY:.6, 
        ease: Expo.easeInOut, 
        transformOrigin:"center bottom",
        onComplete: function() {
            element.addClass('selected'); 
            TweenMax.to(element, .3, {
                scaleX: 1,
                scaleY: 1,
                ease: Expo.easeInOut,
                transformOrigin: "center bottom"
            })
            
        }
    });
            
}


var selectedArray = [];
$('.tile').on('touchstart', function(e) {

    showVungleCloseBtn();

    if (inactive) {
        $('.finger').hide();
        inactive = false;
    }
    if (!$(this).hasClass('lock')) {
        addSelected($(this));
        // $(this).addClass('selected');
        //cant choose the same shell twice
        $(this).addClass('lock');

        console.log($.inArray($(this).data("num"), selectedArray));
        if($.inArray($(this).data("num"), selectedArray) != -1) {
            console.log("match");

            fly($(this).data("num"));
            console.log(selectedArray);
        }else {
            console.log("push " + $(this).data("num"));
            selectedArray.push($(this).data("num"));
            console.log(selectedArray);
        }


    }
});


tl = new TimelineMax();

$('.tile').each(function(index, element) {
    tl.from(element, 0.9, { left: "50%", top: "150%" }, index * 0.17);
})

    
setTimeout(function() {
    // flipCards('.tile', 'shell-close.png', removeLock);
    removeLock();
}, 2500);


