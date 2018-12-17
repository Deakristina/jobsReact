import React  from 'react'

function jobSeeker (props){
    var info = props.basicInfo.data.info
    var arrayInfoBase = Object.values(info.base)
    var arrayInfoExtended = Object.values(info.extendedInfo)
    var keysBase = Object.keys(info.base)
    var keysExtended = Object.keys(info.extendedInfo)
    var showMore = false
    var jobs = props.basicInfo.data.jobs.saved
    
    
    // for(let key in info.base){
    //     arrayInfoBase.push(key)
    // }
    // for(let element in info.extendedInfo){
    //     arrayInfoExtended.push(element)
    // }

    //Mapping
    var arrayInfoBaseMap = arrayInfoBase.map((element, pos) => element = <li >{element}</li>)
    var arrayInfoExtendedMap = arrayInfoExtended.map((element, pos) => element = <li >{element}</li>)
    var jobsMapped = jobs.map((element) => element = <p>{element}</p>)

   if(showMore){
       return(
           <div>
               <ul>
                   {arrayInfoBaseMap}
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

export default jobSeeker