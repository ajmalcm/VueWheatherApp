import { defineStore } from "pinia";
import {ref} from "vue";
import axios from 'axios';

const api=import.meta.env.VITE_API_KEY;

export const useApiStore=defineStore("api",()=>{
    const searchTerm=ref({
        query:"",
        result:"",
        timeout:""
    })

    const places=ref([]);

    const searchHandler=()=>{
        clearTimeout( searchTerm.value. timeout)
        if( searchTerm.value. query.length>0)
        {
             searchTerm.value. timeout=setTimeout(async()=>{
                // console.log( searchTerm.value. query)
                const {data}=await axios.get(`http://api.weatherapi.com/v1/search.json?key=${api}&q=${ searchTerm.value.query}`) 
                 searchTerm.value. result=data;
                // console.log( searchTerm.value. result);
            },500)
        }
        else
        {
             searchTerm.value.result=null
        }
    
    }
    
    const onPlaceHandler=async(id)=>{
        console.log(id)
        const {data}=await  axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${api}&q=id:${id}&days=3&aqi=no&alerts=no`)
         places.value.push(data);
         searchTerm.value.result=null
    }

    const onDeleteCard=(index)=>{
        places.value.splice(index,1);
    }
    
    return {places,searchTerm,searchHandler,onPlaceHandler,onDeleteCard}
})