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
    <div class="d-flex flex-row flex-wrap rowwidth mx-auto " style="gap:10px">
        <div v-for="(place,index) in store.places" class=" rounded-lg mb-2 containerWidth d-flex justify-space-between align-center" style="position: relative;" >
            <WhaeatherCard :place="place" :key="index" :index="index"/>
        </div>

    </div>
   
</v-container>
</template>

<style scoped>
.rowwidth{
    width:50%
}

.containerWidth{
    width:48%;
}

@media screen and (max-width: 768px) {
    .rowwidth{
        width:90%;
        flex-direction: column;
    }

    .containerWidth{
        width: 100%;
    }
}

@media screen and (max-width: 640px) {
    .containerWidth{
        flex-direction: column;
    }
}
</style>