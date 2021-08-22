import React from 'react';
import './pointage.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import getToday from '../middlewares/getToday'

const id="6120d3f891cae707240e50d1";



function pointage() {
 function clockIn(id) {
    if(getToday.hours>=17)
     {Swal.fire({text:"it's too late to clock in wait for tomorrow"})}
     else if(getToday.hours<8 )
     {Swal.fire({text:"it 's too early to clock in wait for 8 am"})}
     else{

      const data = { employee: id, date: getToday().currentDate };
      axios.post("http://localhost:4000/workingDays/getbydateandemployee", data).then((res) => {
        const workingDay = res.data.data;  
        if (workingDay == null) {
           axios.post("http://localhost:4000/workingdays", data).then((res) => {
     
            axios.post("http://localhost:4000/pointages", {employee:id}).then((res)=>{console.log("res1:",res.data)}).catch((err)=>{console.log("res1",err)});
          });
        }
        else {
          const tabPointage = workingDay.pointages;
          if (tabPointage[tabPointage.length -1].clockOut.status == false) {
            Swal.fire({
              title: 'error',
              icon: 'error',
              text: 'you have already clocked in clock out to clock in again',
              footer: '<a href>Why do I have this issue?</a>'
            })
          }
          else {
            axios.post("http://localhost:4000/pointages", {employee:id}).then((res)=>{console.log("res2:",res.data)}).catch((err)=>{console.log("res2",err)});
          }
        }
      })

     }
    

  }



function clockOut(id) {
    //njibou lworking day ta3 nharethe
    if(getToday.hours>=17)
     {Swal.fire({text:"it's too late to clock out wait for tomorrow"})}
     else if(getToday.hours<8 )
     {Swal.fire({text:"it 's too early to clock out wait to attend 8 am"})}
     else{
      axios.post("http://localhost:4000/workingDays/getbydateandemployee", { employee: id, date: getToday().currentDate }).then(
        (res) => {
          const workingDay = res.data.data;
      
          if (workingDay == null) {
  
            //ithe ken me femmech asl working day bdate heki nwelliw y9olliu li lezm ypointi 9bel
            Swal.fire({
              title: 'error',
              icon: 'error',
              text: 'clock in to clock out',
              footer: '<a href>Why do I have this issue?</a>'
            })
          }
          else {
            //sinon ne5thou e5r pointage fi table de pointage  w nchoufou est ce que lpointage haka  pointé fil sortie  welle  ithe kenou pointé fi sortie  y9ollou lezem tpointi fil entrée 9bel       
            //sinon na3mlou update lel lel pointage le5reni wen bedlou nbre hours de travail wel clock out date  wen updatiw lnbre hours fil working day concerné
      
            const tabPointage = workingDay.pointages;
  
            if (tabPointage[tabPointage.length -1].clockOut.status == false)
            {
  
             const nbrhours_work = getToday().hours - tabPointage[tabPointage.length -1].clockIn.hours
             const nbrminutes_work = getToday().minutes - tabPointage[tabPointage.length -1].clockIn.minutes
             const workingTime = nbrhours_work * 60 + nbrminutes_work;
              
           
             const clockOutPointage =
             {
  
               time_of_Work_minutes: workingTime,
               clockOut: {
                 hours: getToday().hours,
                 minutes: getToday().minutes,
                 status: true,
               }
             }

         
             console.log("tabpointage dernier pointage id ",tabPointage[tabPointage.length -1]._id);

              axios.put(`http://localhost:4000/pointages/${tabPointage[tabPointage.length -1]._id}`, clockOutPointage).then((res)=>{
                console.log("res3:  pointage after update ",res.data)
            
            
                const fullWorkingTimeaday = tabPointage.map((pointage) => { return (pointage.time_of_Work_minutes) }).reduce((previousValue, currentValue) => { return currentValue + previousValue });
                console.log("...................fullWorkingTimeaday : ...............",fullWorkingTimeaday)
                 const workingDayupdate =
                 {
                   time_of_Work: fullWorkingTimeaday/60,
                   validation: {
                     validated: (fullWorkingTimeaday == 8),
                     temps_manquant: 8 - fullWorkingTimeaday
                   },
                 }
                 console.log(workingDayupdate)
       
                 axios.put(`http://localhost:4000/workingDays/${workingDay._id}`, workingDayupdate).then((res)=>{console.log("res4: ",res.data)}).catch((err)=>{console.log("res4: error .......",err)});
                
            
            
               }).catch((err)=>{console.log("res3: error .....",err)});;

            
           }
           else {
  
             Swal.fire({
               title: 'error',
               icon: 'error',
               text: 'clock in to clock out',
               footer: '<a href>Why do I have this issue?</a>'
             })
  
           }
                         
          }
  
        })
    
     }
    }









  return (

    <div className="row btn-box" >
      <a href="#" className="button3" onClick={()=>{clockIn(id)}}>clock in</a>
      <a href="#" className="button3" onClick={()=>{clockOut(id)}} >clock out</a>
    </div>
  );
}
export default pointage;
