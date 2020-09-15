// Run when page loads
window.onload = function(){
    // Clear input
    document.getElementById("ui").value = "";
    // Reset radio to default
    document.getElementById("cat").checked = true;
    // Reset input and Output when radio check
    clearInputOutput();
    // Get letters while typing
    document.getElementById("ui").addEventListener("keyup", function(event){
        // If not empty
        if(document.getElementById("ui").value != ""){
            // Get user input
            let userInput = event.target.value;
            // Get type
            let type = document.querySelector('input[name="radio"]:checked').value;
            
            // Send a request using AJAX to get Pet Facts (https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=500)
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://cat-fact.herokuapp.com/facts/random?animal_type="+type+"&amount="+userInput+"", true);
            xhr.onload = function(){
                if(this.status == 200){
                    let fact = JSON.parse(this.responseText);
                    console.log(fact);
                    console.log(fact.length);
                    if(fact.length > 0){
                        document.getElementById("out").innerHTML = ``;
                        // Update out element
                        for(let i = 0; fact.length; i++){
                            document.getElementById("out").style.color = "#2c3e50";
                            document.getElementById("out").innerHTML += `<p>${i+1} ) ${fact[i].text}</p>`;
                        }   
                    }
                    // For invalid inputs
                    else{
                        document.getElementById("out").style.color = "#b8322d";
                        document.getElementById("out").innerHTML = "Invalid input, Please check your input!";
                    }
                }
            }
            xhr.send();
        }
        // If Empty
        else{
            document.getElementById("out").style.color = "#2c3e50";
            document.getElementById("out").innerHTML = "Your Input related Facts will be available here!";
        }
    })
}

// Function to reset input and output when radio check
function clearInputOutput(){
    if (document.querySelector('input[name="radio"]')) {
        document.querySelectorAll('input[name="radio"]').forEach((element) => {
            element.addEventListener("change", function(event) {
            // For Input
            document.getElementById("ui").value = "";
            document.getElementById("ui").placeholder = "No. of Facts (Max 500)";
            // For Output
            document.getElementById("out").style.color = "#2c3e50";
            document.getElementById("out").innerHTML = "Your Input related Facts will be available here!";
          });
        });
    }
}
