const cells=document.querySelectorAll(".cell")
const message=document.getElementById("message")
const overlay=document.getElementById("overlay")
const Btnrestart=document.getElementById("btn-restart")
const Btnquit=document.getElementById("btn-quit")
const clickAudio=document.getElementById("click")
const gameroverAudio=document.getElementById("gameover")
let currentTurn = "Player01"

const wins=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

let wonArray=[];

cells.forEach(cell => {
    
    cell.addEventListener("click",action,{once:true})
    cell.addEventListener("mouseenter",hoverIn)
    cell.addEventListener("mouseleave",hoverOut)
} )

Btnrestart.addEventListener("click",restart)
Btnquit.addEventListener("click",quit)

function restart(){
    message.innerText="Player's 01 Turn!!"
    overlay.classList.remove("active")
    cells.forEach(cell => {
        cell.addEventListener("mouseenter",hoverIn)
        cell.addEventListener("mouseleave",hoverOut)
        // cell.removeEventListener("click",action)
        cell.addEventListener("click",action,{once:true})
        cell.classList.remove("cross")
        cell.classList.remove("cross-hover")
        cell.classList.remove("circle")
        cell.classList.remove("circle-hover")
        cell.classList.remove("highlight")
        cell.style.cursor="pointer"

    })
}

function quit(){
    window.close()
}
function action(){
    let currentClass = currentTurn === "Player01" ? "cross" : "circle"
    this.classList.add(currentClass)
    // remove the hover class
    this.classList.remove(`${currentClass}-hover`);
    clickAudio.play()

//winning func
    const isWinner = wins.some((win) => {   //some(win)---check if any one of the wining possiblity
        const result= win.every((i) => cells[i].classList.contains(currentClass)) //every(win)--check if every cell in that combination has the cureentClass.
        if(result){
            wonArray = win
        } 
        return result
    })

    if(isWinner){
        message.innerText =`${currentTurn}'s WON!!`
        wonArray.forEach(i => cells[i].classList.add("highlight"))
        reset()
        return;
    }
//if not win
    else{
                          
                     //const cells = document.querySelectorAll(".cell"); // NodeList
                     //const cellsArray = Array.from(cells); // Array
       
                     //converts the list of cells(Nodelist) into an  proper array.
                     //so that you can use all array methods like .map(), .filter(), .every(), etc.
                     //.every() method is available only on arrays, not NodeList
        const result=Array.from(cells).every((cell) => {    //.every() checks if all items in the array satisfy a certain condition.
            return cell.classList.length ===2
        })


    if(result)
        {
            message.innerText="IT'S A TIE"
            cells.forEach(cell => {
                cell.classList.add("highlight")
            })
            reset()
            return;
    }
    }

        // currentTurn = currentTurn === "Player01" ? "Player02" : "Player01";
    if (currentTurn === "Player01") {currentTurn = "Player02"}
    else {currentTurn = "Player01"}
        
    message.innerText = `${currentTurn}'s Turn!`;
}



function hoverIn() {
    // Check if the cell is already clicked
    if (this.classList.contains("cross") || this.classList.contains("circle")) {
        return; // Do nothing if the cell is already marked
    }
    // Determine the current class (cross or circle)
    let currentClass = currentTurn === "Player01" ? "cross" : "circle";
    // // Add the hover class
    this.classList.add(`${currentClass}-hover`);
}

function hoverOut() {
    // Remove hover classes
    this.classList.remove("cross-hover");
    this.classList.remove("circle-hover");
}

function reset(){
    cells.forEach(cell => {
        cell.removeEventListener("click",action)
        cell.removeEventListener("mouseenter",hoverIn)
        cell.removeEventListener("mouseleave",hoverOut)
        cell.style.cursor="not-allowed"
    })
    gameroverAudio.play();
    
    setTimeout(() =>{
        overlay.classList.add("active")
    },2000)
}
