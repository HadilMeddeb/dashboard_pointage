export default function getDate()
{
    var currentTime = new Date()
    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds= currentTime.getSeconds()
    
    let object={
        Month:month,
        Day:day,
        Year:year,
        hours:hours,
        minutes:minutes,
        seconds:seconds,
        currentDate: (day + "/" + month + "/" + year) 
    } 
   return object;
   
}
