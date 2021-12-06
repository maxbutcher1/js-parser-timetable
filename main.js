const timetable = document.querySelector('.timetable')

let globalData

let groups = []
let lessons = []
const curr_group = 0
const curr_lesson = 1

let claster = []

const fetchData=()=>{

    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTl4XRsk2pxPAAumyB-0l2au3dkO7jC1PDeaTvctjBBU9HOpXyYwapoE_1PNlZsjrFDKFrpj-HK3oDK/pubhtml')
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
        if (!isNaN(text[1])) {
            groups.push(text)
          
            
        }
        else if (!isNaN(text[0])) {
            
        }
        else if (isNaN(text[0]) && text !== 'Зміни до розкладу' && text[3] !== ' ' && text !== 'Понеділок' && text !== 'Чисельник' && text !== 'Навчальна частина') {
            lessons.push(text)
            
        }

        timetable.append(td[i])
        

    }
    
    addToCluster()
    //console.log(lessons.length);  
}


const addToCluster = () =>{
    console.log(lessons);
    const counter = 6
    let c = counter
    for(let i = 0; i<4; i++){
        
        console.log(groups[i]);
        //console.log(c);
        c = counter
        c = counter + i
        for(let j = 1; j<=5;j++){
            
            console.log(`${lessons[c]} `);
            //console.log(lessons[c]);
            c+=4
            //for(let k = 1; k<=5; k++){
               // console.log(`${lessons[]} ${j}`);
           // }
        }
         
    }
    

    
}
fetchData()





