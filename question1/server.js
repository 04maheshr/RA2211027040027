const express1 = require("express");
require("dotenv").config();

const app1 = express1();
const PORT = process.env.PORT
const WINDOW_SIZE =10;
const BASE_URL = "http://20.244.56.144/test";
app1.use(express1.json());
let numbers = [];
const map={
   "p": "primes",
    "f": "fibonacci",
    "e": "even",
    "r": "random" 
}
async function fetchval(type){
    try{
        const response = await fetch(`${BASE_URL}/${map[type]}`);
        if (!response.ok){
            throw new Error("Invalid type");
        }
        const data = await response.json();
        return data;

    }
    catch (error){
        console.log(error)
    }
}

app1.get("/numbers/:type", async (req, res) => {
    const type= req.params.type;
    if(!map[type]){
        return res.status(400).send("Invalid type");
    } 
    const prevState=[...numbers];
    const newnumbers= await fetchval(type)    
    newnumbers.forEach(num => {
        if (!numbers.includes(num)) {
            if (numbers.length >= WINDOW_SIZE) numbers.shift(); // Remove oldest
            numbers.push(num);
        }
    
    });
    let avg=0;
    if(numbers.length>0){
        let sum=numbers.reduce((a,b)=>a+b,0);
        avg=sum/numbers.length;
        avg.toFixed(2);

    }   
    else{
        avg=0;
    }
    res.json({ windowPrevState: prevState, windowCurrState: numbers, numbers: newNumbers, avg });
});

app1.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
