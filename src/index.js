document.addEventListener('DOMContentLoaded', init)

function init () {
    createDogList()
    appendList
    handleEdit
    submitDogForm()
}


function createDogList () {
fetch('http://localhost:3000/dogs')
.then(resp => resp.json())
.then(list => appendList(list))
}

function appendList (list) {
    list.forEach(dog => {
        const tr = document.createElement('tr')
        const tdName = document.createElement('td')
        const tdBreed = document.createElement('td')
        const tdSex = document.createElement('td')
        const tdButton = document.createElement('td')
        const button = document.createElement('button')
        tdName.innerText = dog.name
        tdBreed.innerText = dog.breed
        tdSex.innerText = dog.sex
        button.innerText = 'Edit'
        tdButton.append(button)
        tr.append(tdName, tdBreed, tdSex, tdButton)
        document.querySelector('#table-body').append(tr)
        button.addEventListener('click', handleEdit(dog))
    })
}

function handleEdit(e, dog){
    const dogForm = document.querySelector('#dog-form')
    for (i=0; i<dogForm.children.length < 3; i++) {
        dogForm.children[i].value = e.target.parentNode.parentNode.children[i].innerText
    }
}

function submitDogForm() {
    const dogForm = document.querySelector('#dog-form')
    console.log(dogForm)
    dogForm.addEventListener('submit', e => {
        e.preventDefault()
        console.log(e.target)
    })
}


/**
 * add event listener to form so a submit sends a patch request to the db with the dogs id
 * once persisted to the db, the table should update to reflect the patch
 * do this by creating a new get request that clears the table and then recreates the list from the db
 */