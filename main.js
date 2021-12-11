'use strict'
const timetable = document.querySelector('.timetable')
const inputGroup = document.querySelector('.input_group')
const groupSelected = document.querySelector('#group')


let groups = []
const curr_group = 0
const curr_lesson = 1

let claster = []
let allItems = []
let subAndGroupArr = []
let subAndGroupObj = {
    group: '',
    lessonsList: []
}
const monday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTl4XRsk2pxPAAumyB-0l2au3dkO7jC1PDeaTvctjBBU9HOpXyYwapoE_1PNlZsjrFDKFrpj-HK3oDK/pubhtml'
const tuesday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQNDy6kP_Er32th8XuYpJRKI26iFJiauYR7IY7L-Kqfhu_SYYLUs3hg1MSzWHw2bglOLhwcXgYBiwJD/pubhtml'
const wednesday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpSkr059jyQUZv7HPp813kYED2fmigy14J8fThJ1Eo-6sEixrsjCezT281QCs0eMXBw4oSBoIFqhGM/pubhtml'
const thursday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDA31eofItYZ5nQWwfvF26yq8Snig-oGbtdisOuAm2Ur0-v1h-Qwdmh3-eT3nQGRKW1e7D7KQ2UjUq/pubhtml'
const friday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwv0DHzrT97qJvh7lBovx6BubKJIO_gk_Lesgyn22RlxMclC3z1OW6TKJDhFe1CBJ6fGDSUcciZXzX/pubhtml'
const saturday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vScVScHS0fxSDzdeJwVFgTXo0mSfgZ-Z65KzCLc1bcsX-73tI4UW4Fie8CMpCMVdTD34JNNoM0-oN-7/pubhtml'
/*
//Days buttons
*/
const mo = document.querySelector('.mo')
const tu = document.querySelector('.tu')
const we = document.querySelector('.we')
const th = document.querySelector('.th')
const fr = document.querySelector('.fr')
const sa = document.querySelector('.sa')

let currDay = ''
/* buttons */
mo.addEventListener('click', () => {
    resetData()
    fetchData(monday)
    currDay = 'mo'
    mo.classList.add('active')
    tu.classList.remove('active')
    we.classList.remove('active')
    th.classList.remove('active')
    fr.classList.remove('active')
    sa.classList.remove('active')

})
tu.addEventListener('click', () => {
    resetData()
    fetchData(tuesday)
    currDay = 'tu'
    mo.classList.remove('active')
    tu.classList.add('active')
    we.classList.remove('active')
    th.classList.remove('active')
    fr.classList.remove('active')
    sa.classList.remove('active')
})
we.addEventListener('click',()=>{
    resetData()
    fetchData(wednesday)
    currDay = 'we'
    mo.classList.remove('active')
    tu.classList.remove('active')
    we.classList.add('active')
    th.classList.remove('active')
    fr.classList.remove('active')
    sa.classList.remove('active')
})
th.addEventListener('click',()=>{
    resetData()
    fetchData(thursday)
    currDay = 'th'
    mo.classList.remove('active')
    tu.classList.remove('active')
    we.classList.remove('active')
    th.classList.add('active')
    fr.classList.remove('active')
    sa.classList.remove('active')
})
fr.addEventListener('click',()=>{
    resetData()
    fetchData(friday)
    currDay = 'fr'
    mo.classList.remove('active')
    tu.classList.remove('active')
    we.classList.remove('active')
    th.classList.remove('active')
    fr.classList.add('active')
    sa.classList.remove('active')
})
sa.addEventListener('click',()=>{
    resetData()
    fetchData(saturday)
    currDay = 'sa'
    mo.classList.remove('active')
    tu.classList.remove('active')
    we.classList.remove('active')
    th.classList.remove('active')
    fr.classList.remove('active')
    sa.classList.add('active')
})

/*END buttons */

const resetData=()=>{
    groups = []
    allItems = []
    subAndGroupArr = []
    subAndGroupObj = {
        group: '',
        lessonsList: []
    }
    timetable.innerHTML = ''
}

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
        
        //const r = /^[^0-9]*$/; //регулярка видаляє деякі пари де є цифри
        const textRegExp = /(Зміни до розкладу|Чисельник|Знаменник|Навчальна частина|спорт.зал|гурт. м|Понеділок|Вівторок|Середа|Четвер|П'ятниця|Субота)/;

        if (isNaN(text[0]) && text[0] != 'н' && !textRegExp.test(text)) {//(text.match(r) && !textRegExp.test(text))
            //console.log(text);
            allItems.push(text)
        }
        if (!isNaN(text[0]) && !isNaN(text[1]) && !isNaN(text[2])) {
            console.log();

            groups.push(text)

        }

    })

 //додаємо в масив з групами пусті рядки щоб рахунок не збивався
    groups.splice(7, 0, '')
    groups.splice(10, 0, '')
    groups.splice(11, 0, '')


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
            getSaturday()
            break;

        default:
            break;
    }

    
}
const leasons5 = (a, b, i, count) => {
    let arrLessons = []
    const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
    groupsContainer.classList.add('groups_item') // додаємо клас
    groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
    //timetable.append(groupsContainer) //вставляємо в html
    b = a
    b = a + i
    for (let j = 1; j <= 5; j++) {
        const lessonsContainer = document.createElement('div')
        lessonsContainer.innerHTML = `${allItems[b]} ${b}`
        //timetable.append(lessonsContainer)
        arrLessons.push(allItems[b])
        b += count
    }
    subAndGroupObj = { group: groups[i], lessonsList: arrLessons } // в об'єкт додаємо данні
    subAndGroupArr.push(subAndGroupObj)
}
const leasons6 = (a, b, i, count) => {
    let arrLessons = []
    const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
    groupsContainer.classList.add('groups_item') // додаємо клас
    groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
    // timetable.append(groupsContainer) //вставляємо в html
    b = a
    b = a + i
    for (let j = 1; j <= 6; j++) {
        const lessonsContainer = document.createElement('div')
        lessonsContainer.innerHTML = `${allItems[b]}`
        //  timetable.append(lessonsContainer)
        arrLessons.push(allItems[b])
        b += count
    }
    subAndGroupObj = { group: groups[i], lessonsList: arrLessons } // в об'єкт додаємо данні
    subAndGroupArr.push(subAndGroupObj)
}

//готово
const getMonday = () => {
    //console.log(allItems);

    let counter = 6 // лічильник який починається з 6 індексу так як гупи починаються саме з нього
    let c;
    /*Перший цикл який відповідає за перші 4 елемента в таблиці */
    for (let i = 0; i < 4; i++) {
        leasons5(counter, c, i, 4)

    }

    /*наступний цикл який відповідає за інші 4 елемента в таблиці */
    counter = 24
    c = counter
    for (let i = 4; i < 8; i++) {
        leasons5(counter, c, i, 4)
    }


    counter = 43
    c = counter
    for (let i = 8; i < 12; i++) {
        leasons5(counter, c, i, 4)
    }

    counter = 60
    c = counter
    for (let i = 12; i < 16; i++) {
        leasons5(counter, c, i, 4)
    }

    counter = 85
    c = counter
    for (let i = 16; i < 19; i++) {
        leasons5(counter, c, i, 3)
    }

    counter = 98
    c = counter
    for (let i = 19; i < 22; i++) {
        leasons5(counter, c, i, 3)
    }

    counter = 111
    c = counter
    for (let i = 22; i < 25; i++) {
        leasons5(counter, c, i, 3)
    }

    counter = 124
    c = counter
    for (let i = 25; i < 28; i++) {
        leasons5(counter, c, i, 3)
    }

    counter = 145
    c = counter
    for (let i = 28; i < 30; i++) {
        leasons5(counter, c, i, 2)
    }

    counter = 154
    c = counter
    for (let i = 30; i < 32; i++) {
        leasons5(counter, c, i, 2)
    }

    counter = 163
    c = counter
    for (let i = 32; i < 34; i++) {
        leasons6(counter, c, i, 2)
    }

    counter = 174
    c = counter
    for (let i = 34; i < 36; i++) {
        leasons6(counter, c, i, 2)
    }
    //console.log(groupSelected.value);
    for (let i = 0; i <= subAndGroupArr.length; i++) {
        if (groupSelected.value.toLowerCase().split(' ').join('') === subAndGroupArr[i]?.group.toLowerCase().split(' ').join('')) {
            console.log(subAndGroupArr[i]?.group);
            console.log(subAndGroupArr[i].lessonsList);

            const groupCon = document.createElement('div')
            groupCon.classList.add('groups_item') 
            if (subAndGroupArr[i].group) {

                groupCon.innerHTML = `${subAndGroupArr[i]?.group}`
                timetable.append(groupCon)

                for (let j = 0; j < subAndGroupArr[i].lessonsList.length; j++) {
                    const lessonCon = document.createElement('div')

                    // console.log(subAndGroupArr[i].lessonsList[j]);

                    lessonCon.innerHTML = `${subAndGroupArr[i].lessonsList[j]}`
                    timetable.append(lessonCon)
                }
            }


        }

    }
}
const getTuesday = () => {
    //console.log(allItems);

    let counter = 6 // лічильник який починається з 6 індексу так як гупи починаються саме з нього
    let c;
    /*Перший цикл який відповідає за перші 4 елемента в таблиці */
    for (let i = 0; i < 4; i++) {
        leasons5(counter, c, i, 4)

    }

    /*2наступний цикл який відповідає за інші 4 елемента в таблиці */
    counter = 24
    c = counter
    for (let i = 4; i < 8; i++) {
        leasons5(counter, c, i, 4)
    }

//3
    counter = 43
    c = counter
    for (let i = 8; i < 12; i++) {
        leasons5(counter, c, i, 4)
    }
//4
    counter = 60
    c = counter
    for (let i = 12; i < 16; i++) {
        leasons5(counter, c, i, 4)
    }
//5
    counter = 93
    c = counter
    for (let i = 16; i < 19; i++) {
        leasons5(counter, c, i, 3)
    }
//6
    counter = 106
    c = counter
    for (let i = 19; i < 22; i++) {
        leasons5(counter, c, i, 3)
    }
//7
    counter = 119
    c = counter
    for (let i = 22; i < 25; i++) {
        leasons5(counter, c, i, 3)
    }
//8
    counter = 132
    c = counter
    for (let i = 25; i < 28; i++) {
        leasons5(counter, c, i, 3)
    }
//9
    counter = 153
    c = counter
    for (let i = 28; i < 30; i++) {
        leasons5(counter, c, i, 2)
    }
//10
    counter = 162
    c = counter
    for (let i = 30; i < 32; i++) {
        leasons5(counter, c, i, 2)
    }
//1
    counter = 171
    c = counter
    for (let i = 32; i < 34; i++) {
        leasons6(counter, c, i, 2)
    }
//11
    counter = 182
    c = counter
    for (let i = 34; i < 36; i++) {
        leasons6(counter, c, i, 2)
    }


    for (let i = 0; i <= subAndGroupArr.length; i++) {
        if (groupSelected.value.toLowerCase().split(' ').join('') === subAndGroupArr[i]?.group.toLowerCase().split(' ').join('')) {
            console.log(subAndGroupArr[i]?.group);
            console.log(subAndGroupArr[i].lessonsList);

            const groupCon = document.createElement('div')
            groupCon.classList.add('groups_item')
            if (subAndGroupArr[i].group) {

                groupCon.innerHTML = `${subAndGroupArr[i]?.group}`
                timetable.append(groupCon)

                for (let j = 0; j < subAndGroupArr[i].lessonsList.length; j++) {
                    const lessonCon = document.createElement('div')

                    // console.log(subAndGroupArr[i].lessonsList[j]);

                    lessonCon.innerHTML = `${subAndGroupArr[i].lessonsList[j]}`
                    timetable.append(lessonCon)
                }
            }


        }

    }
}
const getWednesday = () => {
    //console.log(allItems);


    

    let counter = 6 // лічильник який починається з 6 індексу так як гупи починаються саме з нього
    let c;
    /*Перший цикл який відповідає за перші 4 елемента в таблиці */
    for (let i = 0; i < 4; i++) {
        leasons5(counter, c, i, 4)

    }

    /*2наступний цикл який відповідає за інші 4 елемента в таблиці */
    counter = 24
    c = counter
    for (let i = 4; i < 8; i++) {
        leasons5(counter, c, i, 4)
    }

//3
    counter = 43
    c = counter
    for (let i = 8; i < 12; i++) {
        leasons5(counter, c, i, 4)
    }
//4 /// треба змінти таблицю бо розклад для груп (301-О	302 (209)-О	303-Ф 304 (210)-Ф) не працює
    counter = 60
    c = counter
    for (let i = 12; i < 16; i++) {
        leasons5(counter, c, i, 4)
    }
//5
    counter = 90
    c = counter
    for (let i = 16; i < 19; i++) {
        leasons5(counter, c, i, 3)
    }
//6
    counter = 105
    c = counter
    for (let i = 19; i < 22; i++) {
        leasons5(counter, c, i, 3)
    }
//7
    counter = 118
    c = counter
    for (let i = 22; i < 25; i++) {
        leasons5(counter, c, i, 3)
    }
//8
    counter = 131
    c = counter
    for (let i = 25; i < 28; i++) {
        leasons5(counter, c, i, 3)
    }
//9
    counter = 152
    c = counter
    for (let i = 28; i < 30; i++) {
        leasons5(counter, c, i, 2)
    }
//10
    counter = 161
    c = counter
    for (let i = 30; i < 32; i++) {
        leasons5(counter, c, i, 2)
    }
//1
    counter = 170
    c = counter
    for (let i = 32; i < 34; i++) {
        leasons6(counter, c, i, 2)
    }
//11
    counter = 181
    c = counter
    for (let i = 34; i < 36; i++) {
        leasons6(counter, c, i, 2)
    }


    for (let i = 0; i <= subAndGroupArr.length; i++) {
        if (groupSelected.value.toLowerCase().split(' ').join('') === subAndGroupArr[i]?.group.toLowerCase().split(' ').join('')) {
            console.log(subAndGroupArr[i]?.group);
            console.log(subAndGroupArr[i].lessonsList);

            const groupCon = document.createElement('div')
            groupCon.classList.add('groups_item')
            if (subAndGroupArr[i].group) {

                groupCon.innerHTML = `${subAndGroupArr[i]?.group}`
                timetable.append(groupCon)

                for (let j = 0; j < subAndGroupArr[i].lessonsList.length; j++) {
                    const lessonCon = document.createElement('div')

                    // console.log(subAndGroupArr[i].lessonsList[j]);

                    lessonCon.innerHTML = `${subAndGroupArr[i].lessonsList[j]}`
                    timetable.append(lessonCon)
                }
            }


        }

    }
}
const getThursday = () => {
    //console.log(allItems);

    let counter = 6 // лічильник який починається з 6 індексу так як гупи починаються саме з нього
    let c;
    /*Перший цикл який відповідає за перші 4 елемента в таблиці */
    for (let i = 0; i < 4; i++) {
        leasons5(counter, c, i, 4)

    }

    /*2наступний цикл який відповідає за інші 4 елемента в таблиці */
    counter = 24
    c = counter
    for (let i = 4; i < 8; i++) {
        leasons5(counter, c, i, 4)
    }

//3
    counter = 43
    c = counter
    for (let i = 8; i < 12; i++) {
        leasons5(counter, c, i, 4)
    }
//4 /// треба змінти таблицю бо розклад для груп (301-О	302 (209)-О	303-Ф 304 (210)-Ф) не працює
    counter = 60
    c = counter
    for (let i = 12; i < 16; i++) {
        leasons5(counter, c, i, 4)
    }
//5
    counter = 87
    c = counter
    for (let i = 16; i < 19; i++) {
        leasons5(counter, c, i, 3)
    }
//6
    counter = 100
    c = counter
    for (let i = 19; i < 22; i++) {
        leasons5(counter, c, i, 3)
    }
//7
    counter = 113
    c = counter
    for (let i = 22; i < 25; i++) {
        leasons5(counter, c, i, 3)
    }
//8
    counter = 126
    c = counter
    for (let i = 25; i < 28; i++) {
        leasons5(counter, c, i, 3)
    }
//9
    counter = 147
    c = counter
    for (let i = 28; i < 30; i++) {
        leasons5(counter, c, i, 2)
    }
//10
    counter = 156
    c = counter
    for (let i = 30; i < 32; i++) {
        leasons5(counter, c, i, 2)
    }
//1
    counter = 165
    c = counter
    for (let i = 32; i < 34; i++) {
        leasons6(counter, c, i, 2)
    }
//11
    counter = 175
    c = counter
    for (let i = 34; i < 36; i++) {
        leasons6(counter, c, i, 2)
    }


    for (let i = 0; i <= subAndGroupArr.length; i++) {
        if (groupSelected.value.toLowerCase().split(' ').join('') === subAndGroupArr[i]?.group.toLowerCase().split(' ').join('')) {
            console.log(subAndGroupArr[i]?.group);
            console.log(subAndGroupArr[i].lessonsList);

            const groupCon = document.createElement('div')
            groupCon.classList.add('groups_item')
            if (subAndGroupArr[i].group) {

                groupCon.innerHTML = `${subAndGroupArr[i]?.group}`
                timetable.append(groupCon)

                for (let j = 0; j < subAndGroupArr[i].lessonsList.length; j++) {
                    const lessonCon = document.createElement('div')

                    // console.log(subAndGroupArr[i].lessonsList[j]);

                    lessonCon.innerHTML = `${subAndGroupArr[i].lessonsList[j]}`
                    timetable.append(lessonCon)
                }
            }


        }

    }
}
const getFriday = () => {
    //console.log(allItems);


    let counter = 6 // лічильник який починається з 6 індексу так як гупи починаються саме з нього
    let c;
    /*Перший цикл який відповідає за перші 4 елемента в таблиці */
    for (let i = 0; i < 4; i++) {
        leasons5(counter, c, i, 4)

    }

    /*2наступний цикл який відповідає за інші 4 елемента в таблиці */
    counter = 24
    c = counter
    for (let i = 4; i < 8; i++) {
        leasons5(counter, c, i, 4)
    }

//3
    counter = 43
    c = counter
    for (let i = 8; i < 12; i++) {
        leasons5(counter, c, i, 4)
    }
//4 /// треба змінти таблицю бо розклад для груп (301-О	302 (209)-О	303-Ф 304 (210)-Ф) не працює
    counter = 60
    c = counter
    for (let i = 12; i < 16; i++) {
        leasons5(counter, c, i, 4)
    }
//5
    counter = 87
    c = counter
    for (let i = 16; i < 19; i++) {
        leasons5(counter, c, i, 3)
    }
//6
    counter = 100
    c = counter
    for (let i = 19; i < 22; i++) {
        leasons5(counter, c, i, 3)
    }
//7
    counter = 113
    c = counter
    for (let i = 22; i < 25; i++) {
        leasons5(counter, c, i, 3)
    }
//8
    counter = 126
    c = counter
    for (let i = 25; i < 28; i++) {
        leasons5(counter, c, i, 3)
    }
//9
    counter = 147
    c = counter
    for (let i = 28; i < 30; i++) {
        leasons5(counter, c, i, 2)
    }
//10
    counter = 156
    c = counter
    for (let i = 30; i < 32; i++) {
        leasons5(counter, c, i, 2)
    }
//1
    counter = 166
    c = counter
    for (let i = 32; i < 34; i++) {
        leasons6(counter, c, i, 2)
    }
//11
    counter = 176
    c = counter
    for (let i = 34; i < 36; i++) {
        leasons6(counter, c, i, 2)
    }


    for (let i = 0; i <= subAndGroupArr.length; i++) {
        if (groupSelected.value.toLowerCase().split(' ').join('') === subAndGroupArr[i]?.group.toLowerCase().split(' ').join('')) {
            console.log(subAndGroupArr[i]?.group);
            console.log(subAndGroupArr[i].lessonsList);

            const groupCon = document.createElement('div')
            groupCon.classList.add('groups_item')
            if (subAndGroupArr[i].group) {

                groupCon.innerHTML = `${subAndGroupArr[i]?.group}`
                timetable.append(groupCon)

                for (let j = 0; j < subAndGroupArr[i].lessonsList.length; j++) {
                    const lessonCon = document.createElement('div')

                    // console.log(subAndGroupArr[i].lessonsList[j]);

                    lessonCon.innerHTML = `${subAndGroupArr[i].lessonsList[j]}`
                    timetable.append(lessonCon)
                }
            }


        }

    }
}
const getSaturday = () => {
    //console.log(allItems);



    let counter = 6 // лічильник який починається з 6 індексу так як гупи починаються саме з нього
    let c;
    /*Перший цикл який відповідає за перші 4 елемента в таблиці */
    for (let i = 0; i < 4; i++) {
        leasons5(counter, c, i, 4)

    }

    /*2наступний цикл який відповідає за інші 4 елемента в таблиці */
    counter = 24
    c = counter
    for (let i = 4; i < 8; i++) {
        leasons5(counter, c, i, 4)
    }

//3
    counter = 43
    c = counter
    for (let i = 8; i < 12; i++) {
        leasons5(counter, c, i, 4)
    }
//4 /// треба змінти таблицю бо розклад для груп (301-О	302 (209)-О	303-Ф 304 (210)-Ф) не працює
    counter = 60
    c = counter
    for (let i = 12; i < 16; i++) {
        leasons5(counter, c, i, 4)
    }
//5
    counter = 92
    c = counter
    for (let i = 16; i < 19; i++) {
        leasons5(counter, c, i, 3)
    }
//6
    counter = 105
    c = counter
    for (let i = 19; i < 22; i++) {
        leasons5(counter, c, i, 3)
    }
//7
    counter = 118
    c = counter
    for (let i = 22; i < 25; i++) {
        leasons5(counter, c, i, 3)
    }
//8
    counter = 131
    c = counter
    for (let i = 25; i < 28; i++) {
        leasons5(counter, c, i, 3)
    }
//9
    counter = 149
    c = counter
    for (let i = 28; i < 30; i++) {
        leasons5(counter, c, i, 2)
    }
//10
    counter = 158
    c = counter
    for (let i = 30; i < 32; i++) {
        leasons5(counter, c, i, 2)
    }
//11
    counter = 167
    c = counter
    for (let i = 32; i < 34; i++) {
        leasons5(counter, c, i, 2)
    }
//12
    counter = 178
    c = counter
    for (let i = 34; i < 36; i++) {
        leasons5(counter, c, i, 2)
    }


    for (let i = 0; i <= subAndGroupArr.length; i++) {
        if (groupSelected.value.toLowerCase().split(' ').join('') === subAndGroupArr[i]?.group.toLowerCase().split(' ').join('')) {
            console.log(subAndGroupArr[i]?.group);
            console.log(subAndGroupArr[i].lessonsList);

            const groupCon = document.createElement('div')
            groupCon.classList.add('groups_item')
            if (subAndGroupArr[i].group) {

                groupCon.innerHTML = `${subAndGroupArr[i]?.group}`
                timetable.append(groupCon)

                for (let j = 0; j < subAndGroupArr[i].lessonsList.length; j++) {
                    const lessonCon = document.createElement('div')

                    // console.log(subAndGroupArr[i].lessonsList[j]);

                    lessonCon.innerHTML = `${subAndGroupArr[i].lessonsList[j]}`
                    timetable.append(lessonCon)
                }
            }


        }

    }
}


/* const getGroup=()=>{
    console.log(groups);
    for(let i =0; i<= 35;i++){
        const groupsSelector = document.createElement('option')  
    //groupsSelector.classList.add('groups_item') 
        groupsSelector.innerHTML = `${groups[i]}`
        console.log();
        console.log(groupSelected.value);
        groupSelected.append(groupsSelector)
    } 
}*/