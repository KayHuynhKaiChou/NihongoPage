
function executeChoice(formAllQuestion,arrDapAn){
    
    formAllQuestion.forEach((question) => {
        var choices = question.querySelectorAll('li');
        var arrChoices = Array.from(choices)
        arrChoices.forEach((choice) => {
            choice.onclick = function(){
                for(var ele of arrChoices){
                    ele.classList.remove('choice');
                }
                choice.classList.add('choice');
            }
        });   
    });

    var yourCharacter = [];

    var submitEle = document.querySelector('#form-submit');
    submitEle.onclick = () => {
        formAllQuestion.forEach((question) => {
            var choices = question.querySelectorAll('li');
            var arrChoices = Array.from(choices)
            arrChoices.forEach((choice) => {
                if(choice.classList.contains('choice')){
                    yourCharacter.push(choice);
                }
                choice.classList.add('cancelHover')
            });   
        });
        var i = 0;
        var correct = 0;
        for(var ele of yourCharacter){
            //TH chọn đúng đáp án
            if(ele.innerHTML.charAt(0) == arrDapAn[i]){
                ele.classList.remove('choice');
                ele.classList.add('showDapAn');
                correct++;
            //TH chọn sai đáp án
            }else{
                var choices = ele.parentElement.querySelectorAll('li');
                for(var choice of choices){
                    if(choice.innerHTML.charAt(0) == arrDapAn[i]){
                        choice.classList.add('showDapAn');
                    }
                }
            } 
            i++;
        }
        alert(`Bạn đã làm đúng ${correct}/${formAllQuestion.length}`);
    }
    
    var resetEle = document.querySelector('#form-reset');
    resetEle.onclick = () =>{
        window.location.assign("http://127.0.0.1:5500/JapanMultiChoice/testJDP.html");
    }
}

