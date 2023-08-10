let step=1;
let contents = document.querySelectorAll(".content")
let steps = document.querySelectorAll('.step-number')
let errors = document.querySelectorAll('.error')
let plans = document.querySelectorAll(".plan")
let addOns = document.querySelectorAll(".add-on")
let change = document.querySelector('#change')
let footer = document.querySelector('#step-buttons')
let next = document.querySelector("#next-step")
let previous = document.querySelector('#go-back')
let form = document.forms[0]
let monthly = document.querySelector('#monthly')
let yearly = document.querySelector('#yearly')
let selectedAddOns = document.querySelectorAll(".selected-add-on")
let total = 0
let monthlyPeriod = true 
let free =document.querySelectorAll(".free")
let periodButton = document.querySelector("#option-button")
let finalPeriod = document.querySelectorAll(".final-period")
let finalPrice = document.querySelector("#final-price")
let finalPlan = document.querySelector('#final-plan')
let finalPlanPrice = document.querySelector('#final-plan-price')

let sendRequest = document.querySelector('#fetch')
sendRequest.addEventListener('click',async (e)=>{
    e.preventDefault()
    let data = await fetch('https://amaaq.github.io/authAPI/auth/signin',{
        method: 'post',
        body : {
            email : "maaqoul.adil@gmail.com",
            password : "123456789"
        }
    })
    console.log(data)
})


displayStepContent()
changeStepNumberColor()


for(let i=0; i<3;i++){
    form[i].addEventListener('input',()=>{
        form[i].removeAttribute('style')
        if(!errors[i].classList.contains('hidden')){
            errors[i].classList.add('hidden')
        }
    })
}
plans.forEach( plan=> {
    plan.addEventListener('click',()=>{
        plans.forEach(otherplan=>{
            otherplan.classList.remove('selected')
        })
        plan.classList.add('selected')
    })
})

periodButton.addEventListener('click',()=>{
    monthlyPeriod = !monthlyPeriod
    free.forEach(element => {
        element.classList.toggle('not-displayed')
    })
    updatePrices()
    if(monthlyPeriod){
        periodButton.style.justifyContent = "left"
        finalPeriod.forEach(element=>{
            element.textContent = "month"
        })
        monthly.removeAttribute('style')
        yearly.removeAttribute('style')
    } else {
        periodButton.style.justifyContent = "right"
        finalPeriod.forEach(element=>{
            element.textContent = "year"
        })
        yearly.style.color = "hsl(213, 96%, 18%)"
        monthly.style.color = "hsl(231, 11%, 63%)"
    }
})

addOns.forEach((addOn,index) => {
    addOn.addEventListener('click',()=>{
        addOn.classList.toggle('selected')
        selectedAddOns[index].classList.toggle('not-displayed')
    })
})

next.addEventListener('click',()=>{
    if(step == 1 && !validFormFields()){
        return
    }
    if(step == 2){
        if(contents[1].querySelectorAll(".selected").length==0) return
        
    } 
    if(step == 3){
        total = Number(contents[1].querySelector(".selected .price").textContent) 
        finalPlan.textContent = contents[1].querySelector(".selected h5").textContent
        finalPlanPrice.textContent = contents[1].querySelector(".selected .price").textContent
        addOns.forEach((addOn,index) => {
            if(addOn.classList.contains("selected")){
                total += Number(addOn.querySelector(".price").textContent)
            }
        })
        finalPrice.textContent = total
    }
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

function validFormFields(){
    let result = true;
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(form[0].value == ""){
        errors[0].classList.remove("hidden")
        form[0].style.borderColor = 'hsl(354, 84%, 57%)'
        result = false
    } 
    if(!regex.test(form[1].value)){
        errors[1].classList.remove("hidden")
        form[1].style.borderColor = 'hsl(354, 84%, 57%)'
        result = false
    } 
    if(form[2].value == ""){
        errors[2].classList.remove("hidden")
        form[2].style.borderColor = 'hsl(354, 84%, 57%)'
        result = false
    } 
    return result
}

function updatePrices(){
    let prices = document.querySelectorAll(".price")
    let periods = document.querySelectorAll(".period")
    if(monthlyPeriod == true){
        periods.forEach(period => {
            period.textContent = 'mo'
        })
        prices.forEach(price=>{
            price.textContent = Number(price.textContent)/10
        })
    } else {
        periods.forEach(period => {
            period.textContent = 'yr'
        })
        prices.forEach(price=>{
            price.textContent = Number(price.textContent)*10
        })
    }
}