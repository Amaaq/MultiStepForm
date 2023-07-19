let step=1;
let contents = document.querySelectorAll(".content")
let next = document.querySelector("#next-step")
let previous = document.querySelector('#go-back')
let footer = document.querySelector('#step-buttons')
let steps = document.querySelectorAll('.step-number')
displayStepContent()
changeStepColor()
next.addEventListener('click',()=>{
    step++
    displayStepContent()
    changeStepColor()
    changeFooterDisplay()
})
previous.addEventListener('click',()=>{
    step--
    displayStepContent()
    changeStepColor()
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
function changeStepColor(){
    steps.forEach((element,index)=>{
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
        footer.style.display = "none"
    }else {
        footer.style.display = "flex"
        if(step>1){
            previous.classList.remove("hidden")
        }else {
            if(!previous.classList.contains("hidden"))
            previous.classList.add("hidden")
        }
    }
}
