var plus = document.getElementById("plus");
var container = document.querySelector(".number");
var addBtn = document.getElementById("addBtn");
var select = document.querySelector(".select");
// var option = select.options[select.selectedIndex].value;
var forms = [];

for(var i = 0; i < forms.length + 1; i++) {
    plus.addEventListener("click", function(){
    var div = document.createElement("div");
    div.innerHTML = "<div class='row add'><div class='col-3'><select class='form-control mr-sm-2' name='phoneType["+[i]+"]'><option value='Mobile'>Mobile</option><option value='Telephone'>Telephone</option><option value='Fax'>Fax</option></select></div><div class='col-5'><div class='form-group'><input class='form-control' type='number' name='phoneNumber["+[i]+"]' placeholder='Number...'></div></div><div class='col-4'><select class='form-control mr-sm-2 select' name='phoneDefault["+[i]+"]'><option selected value='true'>Default</option><option selected value='false'>Not default</option></select></div></div>";
    forms.push(i++);
    container.appendChild(div);
    });
}


// select.addEventListener("change", function() {
//     if(select.value === true) {
//         addBtn.classList.remove(".disabled");
//     } else {
//         addBtn.classList.add(".disabled");
//     }
//     console.log(select.value);
// }, false);