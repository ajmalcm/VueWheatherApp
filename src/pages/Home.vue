<script setup>
import SearchBar from '../components/SearchBar.vue';

import WhaeatherCard from '../components/WhaeatherCard.vue';
import { useApiStore } from '../stores/apiStore';
// const searchTerm=ref({
//     query:"",
//     result:"",
//     timeout:""
// })

const date=new Date().toLocaleString('en-us',{
    weekday:'long',
    year:'numeric',
    month:'long',
    day:'numeric'
})

// const places=ref([]);
const store=useApiStore();



</script>

<template>
<v-container class="py-8">
    <p class=" text-center py-4">{{ date }}</p>
    <SearchBar :searchTerm="store.searchTerm" :places="store.places"/>
    <v-row class="d-flex flex-row flex-wrap gap-2 max-md:flex-col w-1/2 max-md:w-[90%] mx-auto ">
        <div v-for="(place,index) in store.places" class=" rounded-lg mb-2 w-[48%] max-md:w-[100%] d-flex max-sm:flex-col  relative ">
            <WhaeatherCard :place="place" :key="index" :index="index"/>
        </div>

    </v-row>
   
</v-container>
</template>

<style scoped>

</style>