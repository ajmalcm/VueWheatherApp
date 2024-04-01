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
    <v-container :class="place.current.is_day === 1 ? 'bg-day' : 'bg-night'"
      class="d-flex flex-column px-4 py-5 rounded-lg flex-wrap font-poppins text-white"
    >
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex gap-1 align-center text-sm">
          <i class="fa-solid fa-location-dot"></i>
          <p>{{ place.location.name }}</p>
        </div>

        <div class="d-flex gap-1 align-center text-sm">
          <i class="fa-regular fa-clock"></i>
          <p>{{new Date(place.location.localtime).getHours()}}:{{new Date(place.location.localtime).getMinutes()}}</p>
        </div>
      </div>
      <div class="d-flex flex-column align-center justify-center mb-2">
        <img
          :src="place.current.condition.icon"
          class="w-[100px] -mb-1"
          alt="not found"
        />
        <h2 class="text-6xl">{{ Math.round(place.current.temp_c) }}&deg;</h2>
        <p class="font-medium">{{place.current.condition.text}}</p>
      </div>

      <div class="mx-auto my-2" style="border-bottom: 1px solid white;width: 70%;"></div>

      <div class="d-flex flex-column align-center justify-center gap-3 mb-2" v-for="(day,index) in place.forecast.forecastday">
        <div class="d-flex align-center justify-space-between gap-4 w-full" :key="index">
          <p class="text-sm">{{ new Date(day.date).toLocaleDateString('en-us', { weekday: 'long' }) }}</p>
          <img
            :src="day.day.condition.icon"
            alt="dayImg"
            width="30"
          />
          <p class="text-sm">{{ Math.round(day.day.maxtemp_c) }} / {{ Math.round(day.day.mintemp_c) }}</p>
        </div>
      </div>

      <div class="d-flex align-center justify-end">
        <p class="text-sm cursor-pointer" @click="openMore">More -></p>
      </div>
    </v-container>

    <Transition name="fade">
      <v-container class="font-poppins bg-white opacity-95 rounded-md fl gap-3 align-center justify-center p-2 ani" v-show="more" style="position: absolute;bottom: 0;">
          <i class="fa-solid fa-xmark align-self-end" @click="closeMore"></i>
          <div class="d-flex flex-column gap-2 w-full">
              <div class="d-flex align-center gap-3 w-full justify-space-between">
                <div class="d-flex flex-column align-center gap-1">
                    <i class="fa-solid fa-wind text-subtitle"></i>
                    <p class="text-sm">{{ place.current.wind_kph }} km/h</p> 
                    <p class="text-xs">wind</p>
                </div>
        
                <div class="d-flex flex-column align-center gap-1">
                    <i class="fa-solid fa-droplet text-sm"></i>
                    <p class="text-sm">{{ place.current.humidity }}%</p>
                    <p class="text-xs">humidity</p>
                </div>
        
                <div class="d-flex flex-column align-center gap-1">
                    <i class="fa-solid fa-umbrella text-sm"></i>
                    <p class="text-sm">{{ place.current.precip_mm }} mm</p>
                    <p class="text-xs">precipitation</p>
                </div>
        
              </div>
        
              <div class="d-flex align-center gap-3 w-full justify-space-between">
                <div class="d-flex flex-column align-center gap-1">
                    <i class="fa-solid fa-fan text-sm"></i>
                    <p class="text-sm">{{ place.current.wind_dir }}</p>
                    <p class="text-xs">direction</p>
                </div>
        
                <div class="d-flex flex-column align-center gap-1">
                    <i class="fa-solid fa-temperature-low text-sm"></i>
                    <p class="text-sm">{{ Math.round(place.current.feelslike_c) }}</p>
                    <p class="text-xs">feels</p>
                </div>
        
                <div class="d-flex flex-column align-center gap-1">
                    <i class="fa-solid fa-sun text-sm"></i>
                    <p class="text-sm">{{ place.current.uv }}</p>
                    <p class="text-xs">UV index</p>
                </div>
        
              </div>
          </div>
  
        <div class="d-flex align-center justify-space-between gap-2 w-full">
          <p class="text-xs">last update: {{ place.current.last_updated }}</p>
          <i class="fa-solid fa-trash text-sm" @click="store.onDeleteCard(props.index)"></i> 
        </div>
      </v-container>
      </Transition>
</template>

<style scoped>
.opacity-95{
  opacity: 0.95;
}

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

.fl{
  display: flex;
  flex-direction: column;
}

.text-sm{
font-size: 12px;
}
.text-xs{
font-size:10px;
font-weight: 300;
}
.w-full{
  width:100%;
}

.gap-1{
  gap:4px;
}

.gap-2{
  gap:8px;
}

.gap-3{
  gap:12px;
}

@media screen and (max-width: 640px) {
    .containerWidth{
        width: 100%;
    }
}

</style>
