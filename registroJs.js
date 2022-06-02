

var backend = "https://crudcrud.com/api/21b482b06768460687e3967bcdb7488e";
var  personas = new Array();


var persona={cedula:"", nombre:"",clave:"", especialidad:"", fee:"", localidad:"localidad",
                horario:[ {checked:false}, {checked:false}, {checked:false}, {checked:false}, {checked:false}]};

var horario = [lunes,martes,miercoles,jueves,viernes];
var lunes = {checked:false};
var martes = {checked:false};
var miercoles = {checked:false};
var jueves = {checked:false};
var viernes = {checked:false};


var id="";



function mostrarPersona(){
    console.log("Mostrar Persona");
    
    /* $("#listado").html(""); */
   /*  personas.forEach( (p)=>{row($("#listado"),p);});	 */
   
   document.getElementById("cedula").value = persona.cedula;
   document.getElementById("nombre").value = persona.nombre;
   document.getElementById("clave").value = persona.clave;

   //$('#add-modal').modal('show');
  }  

function existePersona(){
      let existe=false;

      personas.forEach( (p)=> {
          if(p.cedula == persona.cedula && p.clave == persona.clave){
            existe = true;
            console.log("ced: "+ p.cedula + " - ced: " + persona.cedula)
            persona = p;            
          } 
      })
      return existe;
  }
 
function fetchAndLoad(){
   
    const request = new Request(backend+'/personas', {method:'GET', headers: { }});
    (async ()=> {
        try{
            const response = await fetch(request);
            
            personas = await response.json();
            console.log("Personas Array-> "+ JSON.stringify(personas));
            
            //mostrarPersona();
            //-> mostrar datos de persona registrada
        }catch(e){

        }
    })();
}

function load(){
    id = persona._id; //- llamar al formulario
    //---  Set Persona, antes del request.  !!
    persona = Object.fromEntries( (new FormData($("#formulario").get(0))).entries());
    
    //saveSchedule();// -- ojo 
    horario = [lunes,martes,miercoles,jueves,viernes];
    persona.horario = horario;

    console.log("Persona->");
    console.log(JSON.stringify(persona));
}

function add(){
    console.log("Add method")
    load();
    /* if (!validar()) return; */
    
    const request = new Request(backend + '/personas', {method:'POST',headers:{'Content-Type':'application/json'}, body:JSON.stringify(persona)});
    (async ()=> {
        try{
            const response = await fetch(request);
            
            fetchAndLoad(); //- traer lista de personas
            reset();
        }catch(e){
            
        }
    })();

}

function search(){
    console.log("Search method");

    load(); //- persona loaded

    const request = new Request(backend+'/personas', {method:'GET', headers: { }});
    (async ()=> {
        try{
            const response = await fetch(request);
            
            personas = await response.json();
            console.log("Personas-> "+ JSON.stringify(personas))

            if(existePersona()){ 
                
                //--- LOGIN finalizado
                console.log("Existe persona!!")
                mostrarPersona();

            }else{
                console.log("No existe persona")
            }
            
        }catch(e){

        }
    })();

}

function render(){
    /* $("#cedula").val(persona.cedula);
    $("#cedula").val(persona.clave); */

    $("#cedula").prop("readonly", false);
    
    //*******************--------------------******************* */
      add();
    //search();
    //--------------------------------------------------------
}

function reset(){
    persona={cedula:"", nombre:"",clave:"", especialidad:"", fee:"", localidad:"localidad",
                horario:[ {checked:false}, {checked:false}, {checked:false}, {checked:false}, {checked:false}]};
}

function makeNew(){
    console.log("Make new");
    reset();
    render();
}

function saveSchedule(){

    //const checkBoxList = document.querySelectorAll("checked");
    const checkL = document.querySelector('#lunes');
    const checkM = document.querySelector('#martes');
    const checkI = document.querySelector('#miercoles');
    const checkJ = document.querySelector('#jueves');
    const checkV = document.querySelector('#viernes');
    
    //persona.horario[0].checked  = lunes;
    console.log("P 1");
    console.log(JSON.stringify(persona));

    // Lunes Only
    if(checkL.checked){
        const desdeL = document.querySelector('#desdeL');
        const hastaL = document.querySelector('#hastaL');
        // --> Agregar desde y hasta a el día marcado
        lunes = {checked:true,desde:desdeL.value, hasta:hastaL.value};
    }else { lunes = {checked:false}; }

    if(checkM.checked){
        const desdeM = document.querySelector('#desdeM');
        const hastaM = document.querySelector('#hastaM');
        
        martes = {checked:true,desde:desdeM.value, hasta:hastaM.value};
    }else { martes = {checked:false}; }
    if(checkI.checked){/*  */
        const desdeI = document.querySelector('#desdeI');
        const hastaI = document.querySelector('#hastaI');
        
        miercoles = {checked:true,desde:desdeI.value, hasta:hastaI.value};
    }else { miercoles = {checked:false}; }
    if(checkJ.checked){
        const desdeJ = document.querySelector('#desdeJ');
        const hastaJ = document.querySelector('#hastaJ');
        
        jueves = {checked:true,desde:desdeJ.value, hasta:hastaJ.value};
    }else { jueves = {checked:false}; }
    if(checkV.checked){
        const desdeV = document.querySelector('#desdeV');
        const hastaV = document.querySelector('#hastaV');
        
        viernes = {checked:true,desde:desdeV.value, hasta:hastaV.value};
    }else { viernes = {checked:false}; }


    //***********  YA FUNCIONÓ  ************** */

    //fetchUpdate();

}

function fetchUpdate(){


    const request = new Request(backend + '/personas/'+id, {method: 'PUT', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(persona)});
    (async ()=> {
        try{
            const response = await fetch(request);
            if(!response.ok){ }
            //fetchAndList();
            reset();
            $('#add-modal').modal('hide');
        }catch(e){

        }
    })();
}

function verHorario(){

    $('#add-modal').modal('show');
    $('#aplicar').click(saveSchedule);

    console.log("Solicitando Persona del Servidor.....");
    fetchAndLoad();

}

function checkLocalStorage(){

    if(localStorage.getItem('doctor')){
        //- Cargar datos en fields

        persona = JSON.parse(localStorage.getItem('doctor'));
        
        document.querySelector('#cedula').value = persona.cedula;
        document.querySelector('#nombre').value = persona.nombre;
        document.querySelector('#clave').value = persona.clave;
        document.querySelector('#especialidad').value = persona.especialidad;
        document.querySelector('#fee').value = persona.fee;
        document.querySelector('#localidad').value = persona.localidad;

        //-- add schedule

        console.log("Horario L: " + JSON.stringify(persona.horario[0]));
        console.log("Horario M: " + persona.horario[1]);

        $('#lunes').on("click",
                (e)=>{e.target.parentNode.parentNode.querySelector('.col-body').classList.toggle("active");});
        $('#martes').on("click",
                (e)=>{e.target.parentNode.parentNode.querySelector('.col-body').classList.toggle("active");});
        $('#miercoles').on("click",
                (e)=>{e.target.parentNode.parentNode.querySelector('.col-body').classList.toggle("active");});
        $('#jueves').on("click",
                (e)=>{e.target.parentNode.parentNode.querySelector('.col-body').classList.toggle("active");});
        $('#viernes').on("click",
                (e)=>{e.target.parentNode.parentNode.querySelector('.col-body').classList.toggle("active");});
                

        document.querySelector('#lunes').checked = persona.horario[0].checked; 
        document.querySelector('#martes').checked = persona.horario[1].checked; 
        document.querySelector('#miercoles').checked = persona.horario[2].checked; 
        document.querySelector('#jueves').checked = persona.horario[3].checked; 
        document.querySelector('#viernes').checked = persona.horario[4].checked;

             

        if(persona.horario[0].checked){
            document.querySelector('#desdeL').value = persona.horario[0].desde;
            document.querySelector('#hastaL').value = persona.horario[0].hasta;

            document.querySelector('#lunes').parentNode.parentNode.querySelector('.col-body').classList.toggle("active");
        }
        if(persona.horario[1].checked){
            document.querySelector('#desdeM').value = persona.horario[1].desde;
            document.querySelector('#hastaM').value = persona.horario[1].hasta;

            document.querySelector('#martes').parentNode.parentNode.querySelector('.col-body').classList.toggle("active");
        }
        if(persona.horario[2].checked){
            document.querySelector('#desdeI').value = persona.horario[2].desde;
            document.querySelector('#hastaI').value = persona.horario[2].hasta;

            document.querySelector('#miercoles').parentNode.parentNode.querySelector('.col-body').classList.toggle("active");
        }
        if(persona.horario[3].checked){
            document.querySelector('#desdeJ').value = persona.horario[3].desde;
            document.querySelector('#hastaJ').value = persona.horario[3].hasta;

            document.querySelector('#jueves').parentNode.parentNode.querySelector('.col-body').classList.toggle("active");
        }
        if(persona.horario[4].checked){
            document.querySelector('#desdeV').value = persona.horario[4].desde;
            document.querySelector('#hastaV').value = persona.horario[4].hasta;

            document.querySelector('#viernes').parentNode.parentNode.querySelector('.col-body').classList.toggle("active");
        }
    }
}

function loaded(){

    checkLocalStorage();
    $("#login").click(makeNew);
    $("#horario").click(verHorario);
}

$(loaded);