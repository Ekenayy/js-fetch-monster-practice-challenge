const monstersIndex = "http://localhost:3000/monsters/?_limit=50"
const monsterContainer = document.querySelector('#monster-container')

let monsterForm = document.querySelector('#new-monster-form')
let fetchHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json"}
let getCount = 0

let getMonster = (website) => {
    fetch(website)
    .then(response  => response.json())
    .then(monsters => {
        monsters.forEach(monster => renderMonster(monster))
    })
    .then(getCount += 1)
}

    getMonster(monstersIndex)

let renderMonster = (monster) => {

    let allMonsterDiv = document.querySelector("#monster-container")


    const oneMonsterDiv =  document.createElement('div')

    const monsterH2 = document.createElement('h2')
    monsterH2.textContent = monster.name

    const monsterH4 = document.createElement('h4')
    monsterH4.textContent = monster.age

    const monsterP = document.createElement('p')
    monsterP.textContent = monster.description

    oneMonsterDiv.append(monsterH2, monsterH4, monsterP)
    allMonsterDiv.append(oneMonsterDiv)
}

   let createMonsterFromForm = (evt) => {
       evt.preventDefault()
    //    debugger

        let newMonster = {
        name: evt.target.name.value,
        age: evt.target.age.value,
        description: evt.target.description.value
        }
        
        postNewMonster(newMonster)
    //    debugger
   }

   let postNewMonster = (monsterObject) => {

        const  configObject = {
            method: "POST",
            headers: fetchHeaders,
            body: JSON.stringify(monsterObject)
        }
        // debugger

        fetch(monstersIndex, configObject)
        .then(res => res.json())
        .then(monster => renderMonster(monster))
        .then(monsterForm.reset())
   }

    monsterForm.addEventListener('submit', createMonsterFromForm)

    const forwardButton = document.querySelector('#forward')

    let next50 = (evt) => {
        evt.preventDefault()

        while (monsterContainer.firstChild) {
            let child = monsterContainer.firstChild
            monsterContainer.removeChild(child)
        }
        getMonster(`${monstersIndex}&_page=${getCount + 1}`)
    }   

    forwardButton.addEventListener('click', next50)
