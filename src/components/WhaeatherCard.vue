<script setup>
import {ref,onMounted, onUnmounted} from "vue";
import {useApiStore} from "../stores/apiStore";
const props=defineProps({
    place:Object,
   
    index:Number
})

const store=useApiStore();
const more=ref(false)

const openMore=()=>{
    more.value=true
}

const closeMore=()=>{
    more.value=false
}



</script>

<template>
    <div :class="place.current.is_day === 1 ? 'bg-day' : 'bg-night'"
      class="flex flex-col p-4 py-5 w-full max-sm:w-[100%]  rounded-lg flex-wrap font-poppins text-white"
    >
      <div class="flex justify-between items-center">
        <div class="flex gap-1 items-center text-sm">
          <i class="fa-solid fa-location-dot"></i>
          <p>{{ place.location.name }}</p>
        </div>

        <div class="flex gap-1 items-center text-sm">
          <i class="fa-regular fa-clock"></i>
          <p>{{new Date(place.location.localtime).getHours()}}:{{new Date(place.location.localtime).getMinutes()}}</p>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center mb-2">
        <img
          :src="place.current.condition.icon"
          class="w-[100px] -mb-1"
          alt="not found"
        />
        <h2 class="text-6xl">{{ Math.round(place.current.temp_c) }}&deg;</h2>
        <p class="font-medium">{{place.current.condition.text}}</p>
      </div>

      <div class="border-b-[1px] mb-2 rounded-full w-[60%] mx-auto"></div>

      <div class="flex flex-col items-center justify-center gap-3 mb-2" v-for="(day,index) in place.forecast.forecastday">
        <div class="flex items-center justify-between gap-4 w-full" :key="index">
          <p class="text-sm">{{ new Date(day.date).toLocaleDateString('en-us', { weekday: 'long' }) }}</p>
          <img
            :src="day.day.condition.icon"
            alt="dayImg"
            class="w-[30px]"
          />
          <p class="text-sm">{{ Math.round(day.day.maxtemp_c) }} / {{ Math.round(day.day.mintemp_c) }}</p>
        </div>
      </div>

      <div class="flex items-center justify-end">
        <p class="text-sm cursor-pointer" @click="openMore">More -></p>
      </div>
    </div>

    <Transition name="fade">
      <div class="font-poppins bg-white absolute bottom-0 opacity-95 rounded-md flex flex-col gap-3 items-center justify-center p-2 ani w-full max-sm:w-[100%]" v-show="more">
          <i class="fa-solid fa-xmark self-end" @click="closeMore"></i>
          <div class="flex flex-col gap-2 w-full">
              <div class="flex items-center gap-3 w-full justify-between">
                <div class="flex flex-col items-center gap-1">
                    <i class="fa-solid fa-wind text-sm"></i>
                    <p class="text-[12px]">{{ place.current.wind_kph }} km/h</p>
                    <p class="font-light text-[10px]">wind</p>
                </div>
        
                <div class="flex flex-col items-center gap-1">
                    <i class="fa-solid fa-droplet text-sm"></i>
                    <p class="text-[12px]">{{ place.current.humidity }}%</p>
                    <p class="font-light text-[10px]">humidity</p>
                </div>
        
                <div class="flex flex-col items-center gap-1">
                    <i class="fa-solid fa-umbrella text-sm"></i>
                    <p class="text-[12px]">{{ place.current.precip_mm }} mm</p>
                    <p class="font-light text-[10px]">precipitation</p>
                </div>
        
              </div>
        
              <div class="flex items-center gap-3 w-full justify-between">
                <div class="flex flex-col items-center gap-1">
                    <i class="fa-solid fa-fan text-sm"></i>
                    <p class="text-[12px]">{{ place.current.wind_dir }}</p>
                    <p class="font-light text-[10px]">direction</p>
                </div>
        
                <div class="flex flex-col items-center gap-1">
                    <i class="fa-solid fa-temperature-low text-sm"></i>
                    <p class="text-[12px]">{{ Math.round(place.current.feelslike_c) }}</p>
                    <p class="font-light text-[10px]">feels</p>
                </div>
        
                <div class="flex flex-col items-center gap-1">
                    <i class="fa-solid fa-sun text-sm"></i>
                    <p class="text-[12px]">{{ place.current.uv }}</p>
                    <p class="font-light text-[10px]">UV index</p>
                </div>
        
              </div>
          </div>
  
        <div class="flex items-center justify-between gap-2 w-full">
          <p class="text-[10px]">last update: {{ place.current.last_updated }}</p>
          <i class="fa-solid fa-trash text-sm" @click="store.onDeleteCard(props.index)"></i> 
        </div>
      </div>
      </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active{
transition: opacity 0.5s ease;;
}

.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}

.bg-day {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);

}
.bg-night {
  background-color: #07223d;
  background-image: linear-gradient(62deg, #0a2a4a 0%, #270845 100%);
}
</style>
