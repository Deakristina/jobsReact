import React from 'react'

var jobOffer = (props) => {
    var info = props.basicInfo.info
    var arrayInfoBase
    var arrayInfoExtended
    var keysBase = Object.keys(info.base)
    var keysExtended = Object.keys(info.extendedInfo)
    var showMore = false
    var jobs = props.jobs.jobsPosted
    var jobsMapped = jobs.map((element) => element = <p>{element}</p>)


    for(let key in info.base){
        arrayInfoBase.push(key)
    }
    for(let element in info.extendedInfo){
        arrayInfoExtended.push(element)
    }

    var arrayInfoBaseMap = arrayInfoBase.map((element, pos) => element = <li name = {keysBase[pos]}>{element}</li>)
    var arrayInfoExtendedMap = arrayInfoExtended.map((element, pos) => element = <li name = {keysExtended[pos]}>{element}</li>)

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