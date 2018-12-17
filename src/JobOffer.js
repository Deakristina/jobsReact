import React from 'react'

var jobOffer = (props) => {
   
    var info = props.basicInfo.data.info
    var arrayInfoBase = Object.values(info.base)
    var arrayInfoExtended = Object.values(info.extendedInfo)
    var keysBase = Object.keys(info.base)
    var keysExtended = Object.keys(info.extendedInfo)
    var showMore = false
    var jobs = props.basicInfo.data.jobs.postedJobs

    debugger

    // for(let key in info.base){
    //     arrayInfoBase.push(key)
    // }
    // for(let element in info.extendedInfo){
    //     arrayInfoExtended.push(element)
    // }
    console.log(arrayInfoBase)
    console.log(arrayInfoExtended)

    var arrayInfoBaseMap = arrayInfoBase.map((element, pos) => element = <li >{element}</li>)
    var arrayInfoExtendedMap = arrayInfoExtended.map((element, pos) => element = <li >{element}</li>)
    var jobsMapped = jobs.map((element) => element = <li>{element}</li>)

   if(showMore){
       return(
           <div>
               <ul>
                   {arrayInfoBaseMap}
               </ul>
               <ul>
                   {arrayInfoExtendedMap}
               </ul>
           </div>
       )
   }
   else{
    
    return(
        <div>
            <ul name='basicInfo'>
                {arrayInfoBaseMap}
            </ul>
            <ul name='extendedInfo'>
                {arrayInfoExtendedMap}
            </ul>
            <div name='jobHistory'>
                {jobsMapped}
            </div>
        </div>
    )
   }    
}

export default jobOffer