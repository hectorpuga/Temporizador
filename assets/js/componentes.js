class Componentes{
    
    constructor(){
        this.columBotones = document.querySelectorAll(".col-md-12")[4];
        this.timerContainer=document.createElement("div");
        this.timerElement=document.createElement("div")
        this.startButton=document.createElement("button");
        this.pauseButton=document.createElement("button");
        this.finishButton=document.createElement("button")
        this.addClass();
        this.addIds();
        this.addText();
        this.addStyles();
        this.addComponents();
    }


    addClass(){
        this.timerContainer.classList.add('timer-container');
        this.timerElement.classList.add('timer');
    }

    addIds(){
        this.startButton.id='start-btn';
        this.pauseButton.id='pause-btn';
        this.finishButton.id='finish-btn';

    }

    addText(){
        this.timerElement.textContent='00:00:00';
        this.startButton.textContent='Iniciar';
        this.pauseButton.textContent='Pausar';
        this.finishButton.textContent='Finalizar';
    }

    addStyles(){
        this.pauseButton.style.display='none';
        this.finishButton.style.display='none';

    }

    addComponents(){

        this.timerContainer.append(this.timerElement);
        this.timerContainer.append(this.startButton);
        this.timerContainer.append(this.pauseButton);
        this.timerContainer.append(this.finishButton);
        this.columBotones.append(this.timerContainer);


    }


}
