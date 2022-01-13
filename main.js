'use strict'
const timetable = document.querySelector('.timetable')
const inputGroup = document.querySelector('.input_group')
const groupSelected = document.querySelector('#group')
const dateOfLessons = document.querySelector('.dateOfLessons')


let groups = []

let claster = []
let allItems = []
let subAndGroupArr = []
let subAndGroupObj = {
    group: '',
    lessonsList: []
}

let classRoomObj = { group: '', auditories: [] }
let classRoomArr = []


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
we.addEventListener('click', () => {
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
th.addEventListener('click', () => {
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
fr.addEventListener('click', () => {
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
sa.addEventListener('click', () => {
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

const resetData = () => {
    groups = []
    allItems = []
    otherData = []
    subAndGroupArr = []
    subAndGroupObj = {
        group: '',
        lessonsList: []
    }
    classRoomObj = { group: '', auditories: [] }
    classRoomArr = []
    timetable.innerHTML = ''
    dateOfLessons.innerHTML = ''
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

let otherData = []
const displayData = (data) => {
    let str = data
    const parser = new DOMParser()
    const doc = parser.parseFromString(str, 'text/html')
    const td = doc.querySelectorAll('#sheets-viewport div div table tbody tr td')

    td.forEach((tdItem) => {
        const text = tdItem.innerHTML

        //const r = /^[^0-9]*$/; //регулярка видаляє деякі пари де є цифри
        const textRegExp = /(Зміни до розкладу|Чисельник|Знаменник|Навчальна частина|спорт.зал|гурт. м|Понеділок|Вівторок|Середа|Четвер|П'ятниця|Субота)/;

        if (isNaN(text[0]) && text[0] != 'н' && !textRegExp.test(text) || text === ' ') {//(text.match(r) && !textRegExp.test(text))
            //console.log(text);
            allItems.push(text)
        }
        if (!isNaN(text[0]) && !isNaN(text[1]) && !isNaN(text[2])) {
            console.log();

            groups.push(text)

        }

        otherData.push(text)



    })
    //console.log(otherData);
    getDateOfLessons()
    
    // тут треба цикл і запушити все в масив або в об'єкт
    //додаємо в масив з групами пусті рядки щоб рахунок не збивався
    groups.splice(7, 0, '')
    groups.splice(10, 0, '')
    groups.splice(11, 0, '')


    switch (currDay) {
        case 'mo':
            getDay(6,24,43,60,85,98,111,124,145,154,163,174)
            break;
        case 'tu':
            getDay(6,24,43,60,93,106,119,132,153,162,171,182)
            break;
        case 'we':
            getDay(6,24,43,60,90,105,118,131,152,161,170,181)
            break;
        case 'th':
            getDay(6,24,43,60,87,100,113,126,147,156,165,175)
            break;
        case 'fr':
            getDay(6,24,43,60,87,100,113,126,143,156,166,176)
            break;
        case 'sa':
            getSaturday()
            break;

        default:
            break;
    }


}


const getAuditories = (elementID) => {

    //console.log(otherData);
    for (let m = elementID; m < otherData.length; m += 7) {
        let arrClassroom = []
        for (let k = m + 1; k <= m + 6; k++) {
            arrClassroom.push(otherData[k])
        }
        classRoomObj = { group: otherData[m], auditories: arrClassroom }
        classRoomArr.push(classRoomObj)
        //console.log(otherData[m]);
    }
    
    console.log(classRoomArr);
    console.log(subAndGroupArr);
}

const getDateOfLessons = () => {
    dateOfLessons.innerHTML = `${otherData[1]}`

}
const lessons = (a, b, i, count, lessonsCount) => {
    let arrLessons = []
    const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
    groupsContainer.classList.add('groups_item') // додаємо клас
    groupsContainer.innerHTML = `${groups[i]}` //в середину контейнера вставляємо групу
    //timetable.append(groupsContainer) //вставляємо в html
    //  console.log(groups[i]);
    b = a
    b = a + i
    for (let j = 1; j <= lessonsCount; j++) {
        const lessonsContainer = document.createElement('div')
        lessonsContainer.innerHTML = `${allItems[b]} ${b}`
        //timetable.append(lessonsContainer)
        arrLessons.push(allItems[b])
        b += count
    }


    subAndGroupObj = { group: groups[i], lessonsList: arrLessons } // в об'єкт додаємо данні
    subAndGroupArr.push(subAndGroupObj)
}

const getDay = (a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12) => {
    //console.log(allItems);
    //console.log(otherData);
    let counter = a1 // лічильник який починається з 6 індексу так як гупи починаються саме з нього
    let c;
    /*Перший цикл який відповідає за перші 4 елемента в таблиці */
    for (let i = 0; i < 4; i++) {
        lessons(counter, c, i, 4, 5)

    }

    /*наступний цикл який відповідає за інші 4 елемента в таблиці */
    counter = a2
    c = counter
    for (let i = 4; i < 8; i++) {
        lessons(counter, c, i, 4, 5)
    }


    counter = a3
    c = counter
    for (let i = 8; i < 12; i++) {
        lessons(counter, c, i, 4, 5)
    }

    counter = a4
    c = counter
    for (let i = 12; i < 16; i++) {
        lessons(counter, c, i, 4, 5)
    }

    counter = a5
    c = counter
    for (let i = 16; i < 19; i++) {
        lessons(counter, c, i, 3, 5)
    }

    counter = a6
    c = counter
    for (let i = 19; i < 22; i++) {
        lessons(counter, c, i, 3, 5)
    }

    counter = a7
    c = counter
    for (let i = 22; i < 25; i++) {
        lessons(counter, c, i, 3, 5)
    }

    counter = a8
    c = counter
    for (let i = 25; i < 28; i++) {
        lessons(counter, c, i, 3,5)
    }

    counter = a9
    c = counter
    for (let i = 28; i < 30; i++) {
        lessons(counter, c, i, 2,5)
    }

    counter = a10
    c = counter
    for (let i = 30; i < 32; i++) {
        lessons(counter, c, i, 2, 5)
    }

    counter = a11
    c = counter
    for (let i = 32; i < 34; i++) {
        lessons(counter, c, i, 2, 6)
    }

    counter = a12
    c = counter
    for (let i = 34; i < 36; i++) {
        lessons(counter, c, i, 2, 6)
    }
    //console.log(groupSelected.value);
    getAuditories(354)
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
        lessons(counter, c, i, 4, 5)

    }

    /*2наступний цикл який відповідає за інші 4 елемента в таблиці */
    counter = 24
    c = counter
    for (let i = 4; i < 8; i++) {
        lessons(counter, c, i, 4, 5)
    }

    //3
    counter = 43
    c = counter
    for (let i = 8; i < 12; i++) {
        lessons(counter, c, i, 4, 5)
    }
    //4 
    counter = 60
    c = counter
    for (let i = 12; i < 16; i++) {
        lessons(counter, c, i, 4, 5)
    }
    //5
    counter = 92
    c = counter
    for (let i = 16; i < 19; i++) {
        lessons(counter, c, i, 3, 5)
    }
    //6
    counter = 105
    c = counter
    for (let i = 19; i < 22; i++) {
        lessons(counter, c, i, 3, 5)
    }
    //7
    counter = 118
    c = counter
    for (let i = 22; i < 25; i++) {
        lessons(counter, c, i, 3, 5)
    }
    //8
    counter = 131
    c = counter
    for (let i = 25; i < 28; i++) {
        lessons(counter, c, i, 3, 5)
    }
    //9
    counter = 149
    c = counter
    for (let i = 28; i < 30; i++) {
        lessons(counter, c, i, 2, 5)
    }
    //10
    counter = 158
    c = counter
    for (let i = 30; i < 32; i++) {
        lessons(counter, c, i, 2, 5)
    }
    //11
    counter = 167
    c = counter
    for (let i = 32; i < 34; i++) {
        lessons(counter, c, i, 2, 5)
    }
    //12
    counter = 178
    c = counter
    for (let i = 34; i < 36; i++) {
        lessons(counter, c, i, 2, 5)
    }


    for (let i = 0; i <= subAndGroupArr.length; i++) {
        console.log(`${subAndGroupArr[i]?.group} - ${i}`);
        //console.log(`${classRoomArr[i].group} - ${i}`);
        if (groupSelected.value.toLowerCase().split(' ').join('') === subAndGroupArr[i]?.group.toLowerCase().split(' ').join('')) { //&& groupSelected.value.toLowerCase().split(' ').join('') === classRoomArr[i]?.group.toLowerCase().split(' ').join('')
            //console.log(subAndGroupArr[i]?.group);
            //console.log(subAndGroupArr[i].lessonsList);

            const groupCon = document.createElement('div')
            groupCon.classList.add('groups_item')
            if (subAndGroupArr[i].group) {

                groupCon.innerHTML = `${subAndGroupArr[i]?.group}`
                timetable.append(groupCon)

                for (let j = 0; j < subAndGroupArr[i].lessonsList.length; j++) {
                    const lessonCon = document.createElement('div')

                    // console.log(subAndGroupArr[i].lessonsList[j]);

                    lessonCon.innerHTML = `${subAndGroupArr[i].lessonsList[j]} || }`
                    timetable.append(lessonCon)
                }
            }


        }
        //console.log(groupSelected.value.toLowerCase().split(' ').join('') === subAndGroupArr[i]?.group.toLowerCase().split(' ').join('') && groupSelected.value.toLowerCase().split(' ').join('') === classRoomArr[i]?.group.toLowerCase().split(' ').join(''));
    }
}

/*
Зробив вивід аудиторій, але список груп в масиві для кабінетів і пар не співпадає, тому треба якось придумати щоб воно одночасно шукало і там і там, і тільки піся цього виводило список пар і аудиторій.
*/
