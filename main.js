const timetable = document.querySelector('.timetable')

let globalData

let groups = []
let lessons = []
const curr_group = 0
const curr_lesson = 1

let claster = []

const monday  ='https://docs.google.com/spreadsheets/d/e/2PACX-1vTl4XRsk2pxPAAumyB-0l2au3dkO7jC1PDeaTvctjBBU9HOpXyYwapoE_1PNlZsjrFDKFrpj-HK3oDK/pubhtml'
const thurday = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQNDy6kP_Er32th8XuYpJRKI26iFJiauYR7IY7L-Kqfhu_SYYLUs3hg1MSzWHw2bglOLhwcXgYBiwJD/pubhtml'

const fetchData=()=>{

    fetch(monday)
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
    
    for (let i = 0; i < td.length; i++) {
        text = td[i].innerHTML

        if (text === 'РОЗМІЩЕННЯ ГРУП ПО АУДИТОРІЯХ') { //якщо в text є "РОЗМІЩЕННЯ ГРУП ПО АУДИТОРІЯХ" виходимо з умови і код не виконуємо
            break;
        }
        if (!isNaN(text[0,1]) ) {
            groups.push(text)
          
            
        }
        else if (!isNaN(text[0])) {
            
        }
        else if (isNaN(text[0]) && text !== 'Зміни до розкладу' && text[3] !== ' ' && text !== 'Понеділок' && text !== 'Чисельник' && text !== 'Навчальна частина' && text[0] != 'н'  && text[0] != 'В') {
            lessons.push(text)
            
        }

       // timetable.append(td[i])
        

    }
    lessons.splice(23,1)
    lessons.splice(24,1)
    
    groups.splice(7,0,'')
    groups.splice(10,0,'')
    groups.splice(11,0,'')
    addToCluster()
    console.log(groups); 
    
    console.log(lessons);  
}


const addToCluster = () =>{
    let counter = 6 // ksxbkmybr який починається з 6 індексу так як гупи починаються саме з нього
    
    /*Перший цикл який відповідає за перші 4 елемента в таблиці */
    for(let i = 0; i<4; i++){
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML=`${groups[i]}` //в середину контейнера вставляємо групу
        timetable.append(groupsContainer) //вставляємо в html
        //console.log(`Група: ${groups[i]}`); 
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){ // цикл який відповідає за  філтрацію пар в списку кожні 5 пар
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML=`${lessons[c]}`
            timetable.append(lessonsContainer)
            //console.log(`${lessons[c]} ${c} `);
           
            c+=4
        }
        
    }

    /*наступний цикл який відповідає за інші 4 елемента в таблиці */
    counter = 22
    c = counter
    for(let i = 4; i<8; i++){
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML=`${groups[i]}` //в середину контейнера вставляємо групу
        timetable.append(groupsContainer) //вставляємо в html
        //console.log(`Група: ${groups[i]}`); 
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML=`${lessons[c]}`
            timetable.append(lessonsContainer)
            //console.log(`${lessons[c]} ${c} `);
           
            c+=4
        }
        
    }

    counter = 37
    c = counter
    for(let i = 8; i<12; i++){
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML=`${groups[i]}` //в середину контейнера вставляємо групу
        timetable.append(groupsContainer) //вставляємо в html
        //console.log(`Група: ${groups[i]}`); 
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML=`${lessons[c]} ${c}`
            timetable.append(lessonsContainer)
            //console.log(`${lessons[c]} ${c} `);
           
            c+=4
        }
        
    }

    counter = 58
    c = counter
    for(let i = 12; i<16; i++){
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML=`${groups[i]}` //в середину контейнера вставляємо групу
        timetable.append(groupsContainer) //вставляємо в html
        //console.log(`Група: ${groups[i]}`); 
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML=`${lessons[c]} ${c}`
            timetable.append(lessonsContainer)
            //console.log(`${lessons[c]} ${c} `);
           
            c+=4
        }
        
    }

    counter = 83
    c = counter
    for(let i = 16; i<19; i++){
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML=`${groups[i]}` //в середину контейнера вставляємо групу
        timetable.append(groupsContainer) //вставляємо в html
        //console.log(`Група: ${groups[i]}`); 
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML=`${lessons[c]} ${c}`
            timetable.append(lessonsContainer)
            //console.log(`${lessons[c]} ${c} `);
           
            c+=3
        }
        
    }

    counter = 96
    c = counter
    for(let i = 19; i<22; i++){
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML=`${groups[i]}` //в середину контейнера вставляємо групу
        timetable.append(groupsContainer) //вставляємо в html
        //console.log(`Група: ${groups[i]}`); 
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML=`${lessons[c]} ${c}`
            timetable.append(lessonsContainer)
            //console.log(`${lessons[c]} ${c} `);
           
            c+=3
        }
        
    }

    counter = 109
    c = counter
    for(let i = 22; i<25; i++){
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML=`${groups[i]}` //в середину контейнера вставляємо групу
        timetable.append(groupsContainer) //вставляємо в html
        //console.log(`Група: ${groups[i]}`); 
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML=`${lessons[c]} ${c}`
            timetable.append(lessonsContainer)
            //console.log(`${lessons[c]} ${c} `);
           
            c+=3
        }
        
    }

    counter = 122
    c = counter
    for(let i = 25; i<28; i++){
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML=`${groups[i]}` //в середину контейнера вставляємо групу
        timetable.append(groupsContainer) //вставляємо в html
        //console.log(`Група: ${groups[i]}`); 
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML=`${lessons[c]} ${c}`
            timetable.append(lessonsContainer)
            //console.log(`${lessons[c]} ${c} `);
           
            c+=3
        }
        
    }

    counter = 143
    c = counter
    for(let i = 28; i<30; i++){
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML=`${groups[i]}` //в середину контейнера вставляємо групу
        timetable.append(groupsContainer) //вставляємо в html
        //console.log(`Група: ${groups[i]}`); 
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML=`${lessons[c]} ${c}`
            timetable.append(lessonsContainer)
            //console.log(`${lessons[c]} ${c} `);
           
            c+=2
        }
        
    }

    counter = 152
    c = counter
    for(let i = 30; i<32; i++){
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML=`${groups[i]}` //в середину контейнера вставляємо групу
        timetable.append(groupsContainer) //вставляємо в html
        //console.log(`Група: ${groups[i]}`); 
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML=`${lessons[c]} ${c}`
            timetable.append(lessonsContainer)
            //console.log(`${lessons[c]} ${c} `);
           
            c+=2
        }
        
    }

    counter = 161
    c = counter
    for(let i = 32; i<34; i++){
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML=`${groups[i]}` //в середину контейнера вставляємо групу
        timetable.append(groupsContainer) //вставляємо в html
        //console.log(`Група: ${groups[i]}`); 
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML=`${lessons[c]} ${c}`
            timetable.append(lessonsContainer)
            //console.log(`${lessons[c]} ${c} `);
           
            c+=2
        }
        
    }

    counter = 172
    c = counter
    for(let i = 34; i<36; i++){
        const groupsContainer = document.createElement('div')  // створюємо контейнер для груп
        groupsContainer.classList.add('groups_item') // додаємо клас
        groupsContainer.innerHTML=`${groups[i]}` //в середину контейнера вставляємо групу
        timetable.append(groupsContainer) //вставляємо в html
        //console.log(`Група: ${groups[i]}`); 
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){
            const lessonsContainer = document.createElement('div')
            lessonsContainer.innerHTML=`${lessons[c]} ${c}`
            timetable.append(lessonsContainer)
            //console.log(`${lessons[c]} ${c} `);
           
            c+=2
        }
        
    }
    

    
}
fetchData()





