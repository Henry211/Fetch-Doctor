

var backend = "https://crudcrud.com/api/21b482b06768460687e3967bcdb7488e";
var  personas = new Array();
var persona={cedula:"", nombre:"",clave:""};
var id="";


function mostrarPersona(){
    console.log("Mostrar Persona")
    /* $("#listado").html(""); */
   /*  personas.forEach( (p)=>{row($("#listado"),p);});	 */
   
   //window.location.href = "registro.html";
   //window.open("registro.html");
   
   document.getElementById("cedula3").value = persona.cedulaField;
   document.getElementById("nombre").value = persona.nombreField;
   document.getElementById("clave").value = persona.claveField;

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
            
            mostrarPersona();
        }catch(e){

        }
    })();
}

function load(){
    id = persona._id; //- llamar al formulario
    //---  Set Persona, antes del request.  !!
    persona = Object.fromEntries( (new FormData($("#formulario").get(0))).entries());

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
            fetchAndLoad();
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
            console.log("Personas-> "+ JSON.stringify(personas));

            if(existePersona()){ 
                
                //--- LOGIN finalizado
                console.log("Existe persona!!");
                

                localStorage.setItem("doctor",JSON.stringify(persona));
                
                document.location = "registro.html";

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
    //add();
    search();
    //--------------------------------------------------------
}

function reset(){
    persona={cedula:"", nombre:"",sexo:""};
}

function makeNew(){
    console.log("Make new");
    reset();
    render();
}

function loaded(){
    $("#login").click(makeNew);
}

$(loaded);