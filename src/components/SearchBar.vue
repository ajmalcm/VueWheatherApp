<script setup>
import {useApiStore} from "../stores/apiStore";
const props=defineProps({
    searchTerm:Object,
    places:Array
})


const store=useApiStore()
</script>

<template>
    <div class="flex justify-center items-center flex-col relative mb-3">
        <div class="flex items-center rounded-lg w-[50%] max-md:w-[90%] bg-white shadow-lg">
            <i class="fa-solid fa-magnifying-glass px-2 text-gray-500" ></i>
            <input type="text" v-model="props.searchTerm.query"  class="flex-1 border-none outline-none rounded-lg " placeholder="search here" @input="store.searchHandler()"/>
        </div>

        <div v-if="props.searchTerm.result" class="w-[50%] max-md:w-[90%] border-[1px] rounded-lg bg-white absolute top-12 z-50 shadow-md">
            <div v-for="(place,index) in props.searchTerm.result" class=" flex flex-col gap-2">
                <p @click="store.onPlaceHandler(place.id)" class="px-2 py-1 border-b-[1px] cursor-pointer hover:scale-[1.01] transition-all font-poppins font-light text-sm" :key="place.id">{{place.name}}, {{place.region}}, {{ place.country }}</p>
            </div>
        </div>
    </div>
</template>