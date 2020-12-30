let arr_data = [];

const tabla = document.getElementById("show_data");
const title = document.getElementById("title");
const description = document.getElementById("description");
const modal = document.getElementById('modal-form');
const modalT = document.getElementById('modalTitle');
const modalD = document.getElementById('modalDescription');
const modalB = document.getElementById("modal-boton");
let updateObj = {}


async function get_content() {
      try {
        const res = await axios.get(
          "http://localhost/curso-php/class_crud/crud2/task_api.php"
        );
       // console.log(res.data);
        arr_data = res.data;

        show_content();
      } catch (error) {
        console.log(error);
      }
}


function show_content() {
    let fragment = document.createDocumentFragment();
      arr_data.forEach((e) => {
        let row = document.createElement("tr");
        row.innerHTML = `
                    <th scope='row'  >${e.id}</th>
                        <td> ${e.title}</td>
                        <td> ${e.description}</td>
                        <td > ${e.timestamp} </td>
                        <td id="${e.id}">
                            <button class='btn btn-sm btn-warning' name="edit" data-toggle="modal" data-target="#editModal">Edit</button>
                            <button class='btn btn-sm btn-danger' name="delete">Delete</button>
                        </td>
                    `;
                    fragment.appendChild(row);
      });
    tabla.appendChild(fragment);
}

function actualizar() {
    while (tabla.firstElementChild) {
        tabla.removeChild(tabla.firstElementChild);
     }
    get_content();
}

document.getElementById('formulario')
.addEventListener('submit',(e)=>{
    if(title.value.length > 0 && description.value.length > 0){
        const task = {
          title: title.value,
          description: description.value
        };
      
      axios.post("http://localhost/curso-php/class_crud/crud2/task_api.php", task)
      .then(res=>{
          console.log(res)
        actualizar()
      })
      .catch(err=>{
          console.log(err)
      })
    }
    e.target.reset()
e.preventDefault()
})

tabla.addEventListener('click', async (e)=>{
    if(e.target.name === 'edit'){

        let res = await getOneTask(e.target.parentElement.id);
        let info = res.data[0];
        console.log(info.id);
        updateObj.id = info.id;
        console.log(updateObj)
        modalD.value = info.description;
        modalT.value = info.title;
  

    }else if (e.target.name === "delete") {
        let item = {
          id: e.target.parentElement.id
        };
        console.log(item)
        axios.delete('http://localhost/curso-php/class_crud/crud2/task_api.php', {data:item})
        .then(res=>{
            console.log(res)
            actualizar()
        })
        .catch(err=>{
            console.log(err)
        }) 
    }
})

function getOneTask(param) {
     try {
        return  axios.get(`http://localhost/curso-php/class_crud/crud2/task_api.php`,{params:{id:param}});
          
    } catch (err) {
        console.log(err);
    } 
}

function updateTask(obj) {
    try {
       return axios.put(`http://localhost/curso-php/class_crud/crud2/task_api.php`, obj );
    } catch (error) {
        console.log(error)
    }
}

modalB.addEventListener('click',async (e) =>{
  
    if (modalT.value.length <= 0 || modalD.value.length <= 0) {
        e.target.setAttribute("disabled", '');
        
        setTimeout(() => {
            e.target.removeAttribute("disabled")
        }, 3000); 

       // alert('Please complete all fields');
    }else{
        updateObj.title = modalT.value
        updateObj.description = modalD.value
        
        const res = await updateTask(updateObj);
        console.log(res)
        actualizar()
    }
    e.preventDefault()
})