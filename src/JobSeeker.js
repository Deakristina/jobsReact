import React, { Component } from 'react'
import axios from 'axios';
import local from './local'

var jobSeeker = (props) => {
    var info = props.basicInfo.info
    var arrayInfoBase
    var arrayInfoExtended
    var keysBase = Object.keys(info.base)
    var keysExtended = Object.keys(info.extendedInfo)
    var showMore = false
    var jobs = props.jobs.jobsSaved
    
    for(let key in info.base){
        arrayInfoBase.push(key)
    }
    for(let element in info.extendedInfo){
        arrayInfoExtended.push(element)
    }

    //Mapping
    var arrayInfoBaseMap = arrayInfoBase.map((element, pos) => element = <li name = {keysBase[pos]}>{element}</li>)
    var arrayInfoExtendedMap = arrayInfoExtended.map((element, pos) => element = <li name = {keysExtended[pos]}>{element}</li>)
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