'use strict'
const timetable = document.querySelector('.timetable')
const inputGroup = document.querySelector('.input_group')

let globalData

let groups = []
let lessons = []
const curr_group = 0
const curr_lesson = 1

let claster = []
let allItems = []
let subAndGroupArr=[]
let subAndGroupObj={
    group:'',
    lessonsList:[]
}
const monday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTl4XRsk2pxPAAumyB-0l2au3dkO7jC1PDeaTvctjBBU9HOpXyYwapoE_1PNlZsjrFDKFrpj-HK3oDK/pubhtml'
const tuesday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQNDy6kP_Er32th8XuYpJRKI26iFJiauYR7IY7L-Kqfhu_SYYLUs3hg1MSzWHw2bglOLhwcXgYBiwJD/pubhtml'
const wednesday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpSkr059jyQUZv7HPp813kYED2fmigy14J8fThJ1Eo-6sEixrsjCezT281QCs0eMXBw4oSBoIFqhGM/pubhtml'
const thursday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDA31eofItYZ5nQWwfvF26yq8Snig-oGbtdisOuAm2Ur0-v1h-Qwdmh3-eT3nQGRKW1e7D7KQ2UjUq/pubhtml'
const friday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwv0DHzrT97qJvh7lBovx6BubKJIO_gk_Lesgyn22RlxMclC3z1OW6TKJDhFe1CBJ6fGDSUcciZXzX/pubhtml'
const saturday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwv0DHzrT97qJvh7lBovx6BubKJIO_gk_Lesgyn22RlxMclC3z1OW6TKJDhFe1CBJ6fGDSUcciZXzX/pubhtml'

/*Days buttons */
const mo = document.querySelector('.mo')
const tu = document.querySelector('.tu')
const we = document.querySelector('.we')
const th = document.querySelector('.th')
const fr = document.querySelector('.fr')
const sa = document.querySelector('.sa')

let currDay = ''

mo.addEventListener('click', () => {
    groups = []
    allItems = []
    subAndGroupArr=[]
    subAndGroupObj={
        group:'',
        lessonsList:[]
    }
    timetable.innerHTML = ''
    fetchData(monday)
    currDay = 'mo'
    
})

tu.addEventListener('click', () => {
    groups = []
    allItems = []
    timetable.innerHTML = ''
    fetchData(tuesday)
    currDay = 'tu'
})


const fetchData = (nameOfDay) => {

    fetch(nameOfDay)
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            displayData(data)
        })
}


const displayData = (data) => {
    let str = data
    const parser = new DOMParser()
    const doc = parser.parseFromString(str, 'text/html')
    const td = doc.querySelectorAll('#sheets-viewport div div table tbody tr td')

    td.forEach((tdItem) => {
        const text = tdItem.innerHTML

        const r = /^[^0-9]*$/;
        const textRegExp = /(Зміни до розкладу|Чисельник|Навчальна частина|спорт.зал|гурт. м|Понеділок|Вівторок|Середа|Четвер|П'ятниця|Субота)/;

        if (text.match(r) && !textRegExp.test(text)) {
            allItems.push(text)
        }
        if (!isNaN(text[0]) && !isNaN(text[1]) && !isNaN(text[2])) {
            console.log();

            groups.push(text)

        }

    })

    // lessons.splice(23,1)
    // lessons.splice(27,1)
    groups.splice(7, 0, '')
    groups.splice(10, 0, '')
    groups.splice(11, 0, '')
    //console.log(groups);
   // console.log(allItems);
  
   

    switch (currDay) {
        case 'mo':
            getMonday()
            break;
        case 'tu':
            getTuesday()
            break;
        case 'we':
            getWednesday()
            break;
        case 'th':
            getThursday()
            break;
        case 'fr':
            getFriday()
            break;
        case 'sa':
            getSanday()
            break;

        default:
            break;
    }

    
}

//готово
const getMonday = () => {
    let counter = 6 // ksxbkmybr який починається з 6 індексу так як гупи починаються саме з нього
    let c;
    
    
    /*Перший цикл який відповідає за перші 4 елемента в таблиці */
    for (let i = 0; i < 4; i++) {
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
       // timetable.append(groupsContainer) //вставляємо в html
        // тимчасовий масив для пар
        let arrLessons =[] 
        c = counter
        c = counter + i
        for (let j = 1; j <= 5; j++) { // цикл який відповідає за  філтрацію пар в списку кожні 5 пар
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML = `${allItems[c]}`
            
            arrLessons.push(allItems[c]) // пушим в масив для пар всі пари
           // timetable.append(lessonsContainer)
            
            c += 4
        }
        subAndGroupObj = {group:groups[i],lessonsList:arrLessons} // в об'єкт додаємо данні
        subAndGroupArr.push(subAndGroupObj) // в масив для пар і груп пушимо об'єкт

    }
//console.log(subAndGroupArr);
    /*наступний цикл який відповідає за інші 4 елемента в таблиці */
    counter = 24
    c = counter
    for (let i = 4; i < 8; i++) {
        let arrLessons =[] 

        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
        //timetable.append(groupsContainer) //вставляємо в html

        c = counter
        c = counter + i
        for (let j = 1; j <= 5; j++) {
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML = `${allItems[c]} `
          //  timetable.append(lessonsContainer)
          arrLessons.push(allItems[c])
            c += 4
        }
        subAndGroupObj = {group:groups[i],lessonsList:arrLessons} // в об'єкт додаємо данні
        subAndGroupArr.push(subAndGroupObj)
    }

   
    

    counter = 43
    c = counter
    for (let i = 8; i < 12; i++) {
        let arrLessons =[] 
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
       // timetable.append(groupsContainer) //вставляємо в html
        c = counter
        c = counter + i
        for (let j = 1; j <= 5; j++) {
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML = `${allItems[c]}`
          //  timetable.append(lessonsContainer)
          arrLessons.push(allItems[c])
            c += 4
        }
        subAndGroupObj = {group:groups[i],lessonsList:arrLessons} // в об'єкт додаємо данні
        subAndGroupArr.push(subAndGroupObj)

    }

    counter = 60
    c = counter
    for (let i = 12; i < 16; i++) {
        let arrLessons =[] 
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
       // timetable.append(groupsContainer) //вставляємо в html
        c = counter
        c = counter + i
        for (let j = 1; j <= 5; j++) {
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML = `${allItems[c]}`
           // timetable.append(lessonsContainer)
           arrLessons.push(allItems[c])
            c += 4
        }
        subAndGroupObj = {group:groups[i],lessonsList:arrLessons} // в об'єкт додаємо данні
        subAndGroupArr.push(subAndGroupObj)
    }

    counter = 85
    c = counter
    for (let i = 16; i < 19; i++) {
        let arrLessons =[] 
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
        //timetable.append(groupsContainer) //вставляємо в html
        c = counter
        c = counter + i
        for (let j = 1; j <= 5; j++) {
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML = `${allItems[c]}`
           // timetable.append(lessonsContainer)
           arrLessons.push(allItems[c])
            c += 3
        }
        subAndGroupObj = {group:groups[i],lessonsList:arrLessons} // в об'єкт додаємо данні
        subAndGroupArr.push(subAndGroupObj)
    }

    counter = 98
    c = counter
    for (let i = 19; i < 22; i++) {
        let arrLessons =[]
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
       // timetable.append(groupsContainer) //вставляємо в html
        c = counter
        c = counter + i
        for (let j = 1; j <= 5; j++) {
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML = `${allItems[c]}`
          //  timetable.append(lessonsContainer)
          arrLessons.push(allItems[c])
            c += 3
        }
        subAndGroupObj = {group:groups[i],lessonsList:arrLessons} // в об'єкт додаємо данні
        subAndGroupArr.push(subAndGroupObj)
    }

    counter = 111
    c = counter
    for (let i = 22; i < 25; i++) {
        let arrLessons =[]
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
      //  timetable.append(groupsContainer) //вставляємо в html

        c = counter
        c = counter + i
        for (let j = 1; j <= 5; j++) {
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML = `${allItems[c]} `
          //  timetable.append(lessonsContainer)
          arrLessons.push(allItems[c])
            c += 3
        }
        subAndGroupObj = {group:groups[i],lessonsList:arrLessons} // в об'єкт додаємо данні
        subAndGroupArr.push(subAndGroupObj)
    }

    counter = 124
    c = counter
    for (let i = 25; i < 28; i++) {
        let arrLessons =[]
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
      //  timetable.append(groupsContainer) //вставляємо в html

        c = counter
        c = counter + i
        for (let j = 1; j <= 5; j++) {
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML = `${allItems[c]} ${c}`
        //    timetable.append(lessonsContainer)
        arrLessons.push(allItems[c])
            c += 3
        }
        subAndGroupObj = {group:groups[i],lessonsList:arrLessons} // в об'єкт додаємо данні
        subAndGroupArr.push(subAndGroupObj)
    }

    counter = 145
    c = counter
    for (let i = 28; i < 30; i++) {
        let arrLessons =[]
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
      //  timetable.append(groupsContainer) //вставляємо в html
        c = counter
        c = counter + i
        for (let j = 1; j <= 5; j++) {
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML = `${allItems[c]}`
          //  timetable.append(lessonsContainer)
          arrLessons.push(allItems[c])
            c += 2
        }
        subAndGroupObj = {group:groups[i],lessonsList:arrLessons} // в об'єкт додаємо данні
        subAndGroupArr.push(subAndGroupObj)
    }

    counter = 154
    c = counter
    for (let i = 30; i < 32; i++) {
        let arrLessons =[]
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
       // timetable.append(groupsContainer) //вставляємо в html

        c = counter
        c = counter + i
        for (let j = 1; j <= 5; j++) {
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML = `${allItems[c]}`
           // timetable.append(lessonsContainer)
           arrLessons.push(allItems[c])
            c += 2
        }
        subAndGroupObj = {group:groups[i],lessonsList:arrLessons} // в об'єкт додаємо данні
        subAndGroupArr.push(subAndGroupObj)
    }

    counter = 163
    c = counter
    for (let i = 32; i < 34; i++) {
        let arrLessons =[]
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
      //  timetable.append(groupsContainer) //вставляємо в html

        c = counter
        c = counter + i
        for (let j = 1; j <= 6; j++) {
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML = `${allItems[c]}`
          //  timetable.append(lessonsContainer)
          arrLessons.push(allItems[c])
            c += 2
        }
        subAndGroupObj = {group:groups[i],lessonsList:arrLessons} // в об'єкт додаємо данні
        subAndGroupArr.push(subAndGroupObj)
    }

    counter = 174
    c = counter
    for (let i = 34; i < 36; i++) {
        let arrLessons =[]
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
       // timetable.append(groupsContainer) //вставляємо в html

        c = counter
        c = counter + i
        for (let j = 1; j <= 6; j++) {
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML = `${allItems[c]}`
           // timetable.append(lessonsContainer)
           arrLessons.push(allItems[c])
            c += 2
        }
        subAndGroupObj = {group:groups[i],lessonsList:arrLessons} // в об'єкт додаємо данні
        subAndGroupArr.push(subAndGroupObj)
    }
    
    console.log(subAndGroupArr[35].group.split(' ').join('') === '407-К');
    console.log(subAndGroupArr[35].group);
    
    for(let i=0; i<= subAndGroupArr.length; i++){
        if(inputGroup.value.split(' ').join('') === subAndGroupArr[i].group.split(' ').join('').toLowerCase()){
            console.log(subAndGroupArr[i].group);
            console.log(subAndGroupArr[i].lessonsList);
            
            const groupCon = document.createElement('div')
            groupCon.innerHTML = `${subAndGroupArr[i].group}`
            timetable.append(groupCon)

            for(let j = 0; j<subAndGroupArr[i].lessonsList.length; j++){
                const lessonCon = document.createElement('div')

               // console.log(subAndGroupArr[i].lessonsList[j]);

                lessonCon.innerHTML = `${subAndGroupArr[i].lessonsList[j]}`
                timetable.append(lessonCon)
            }
            
            
        }
    }
}








