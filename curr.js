const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");

const fromcur=document.querySelector("#sel");
const tocur=document.querySelector("#sela");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for (code in countryList){
   let newOption = document.createElement("option");
   newOption.innerText=code;
   newOption.value=code;
   if(select.name==="from" && code==="USD")
   {
    newOption.selected="selected";
   }
   else if(select.name==="to" && code==="INR")
   {
    newOption.selected="selected";
   }
   select.append(newOption);

}

select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
})
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountvalue=amount.value;
    if(amountvalue==="" || amountvalue<1)
    {
        amountvalue=1;
        amount.value="1";
    }
    // console.log(fromcur.value,tocur.value);
    const URL=`${BASE_URL}/${fromcur.value.toLowerCase()}/${tocur.value.toLowerCase()}.json`;
    let response =await fetch(URL);
    let data=await response.json();
    let rate=data[tocur.value.toLowerCase()];
    let final=amount.value*rate;
    msg.innerText=`${amountvalue}${fromcurr.value}=${final}${tocur.value}`;

});

