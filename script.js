let step=1;
let contents = document.querySelectorAll(".content")
let next = document.querySelector("#next-step")
let previous = document.querySelector('#go-back')
let footer = document.querySelector('#step-buttons')
let steps = document.querySelectorAll('.step-number')
let change = document.querySelector('#change')
displayStepContent()
changeStepNumberColor()
next.addEventListener('click',()=>{
    step++
    displayStepContent()
    changeStepNumberColor()
    changeFooterDisplay()
})
previous.addEventListener('click',()=>{
    step--
    displayStepContent()
    changeStepNumberColor()
    changeFooterDisplay()
})
change.addEventListener('click',()=>{
    step = 2;
    displayStepContent()
    changeStepNumberColor()
    changeFooterDisplay()
})

function displayStepContent(){
    if(step>5)return
    contents.forEach((content,index)=>{

        if(index == step-1){
            content.classList.remove("not-displayed")
        }
            
        else if(!content.classList.contains("not-displayed")){
            content.classList.add("not-displayed")
        }
    })
   
}
function changeStepNumberColor(){
    steps.forEach((element,index)=>{
        if(step == 5)return
        if(index>3)return
        if(index == step-1){
            element.style.backgroundColor = 'hsl(206, 94%, 87%)'
            element.style.color = 'black'
            element.style.borderColor = 'transparent'
        }else {
            element.removeAttribute("style")
        }

    
})
}

function changeFooterDisplay(){
    if(step>4){
        if(window.innerWidth>600){
            footer.style.visibility = "hidden"
        }else{
            footer.style.display = "none"
        }
    }else if(step>3){
        footer.removeAttribute('style')
        next.textContent = "Confirm"
        next.style.backgroundColor = "hsl(243, 100%, 62%)"
    }else if (step>1){
        next.textContent = "Next Step"
        next.removeAttribute('style')
        previous.classList.remove("hidden")
    }else if(!previous.classList.contains("hidden")){
        previous.classList.add("hidden")
    }
}

