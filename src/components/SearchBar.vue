<script setup>
import {useApiStore} from "../stores/apiStore";
const props=defineProps({
    searchTerm:Object,
    places:Array
})


const store=useApiStore()
</script>

<template>
    <v-container class="d-flex justify-center align-center flex-column relative mb-3 bg-white">
        <v-card class="d-flex align-center rounded-lg rowwidth bg-white " elevation="5">
            <i class="fa-solid fa-magnifying-glass px-2 text-gray-500" ></i>
            <v-text-field v-model="props.searchTerm.query" dense solo outlined hide-details  class="rounded-lg bg-white" placeholder="search for a place" @input="store.searchHandler()"></v-text-field>
        </v-card>

        <v-card v-if="props.searchTerm.result" class="rowwidth border-primary rounded-lg bg-white absolute" :style="{ top: '3px', zIndex: '50' }" elevation="7">
            <v-paper v-for="(place,index) in props.searchTerm.result" class=" d-flex flex-column gap-2">
                <p @click="store.onPlaceHandler(place.id)" class="px-2 trans text-overline font-weight-thin " :key="place.id">{{place.name}}, {{place.region}}, {{ place.country }}</p>
            </v-paper>
        </v-card>
    </v-container>
</template>

<style scoped>

.trans{
    cursor: pointer;
    transition: all 0.2s ease-in;
}
.trans:hover{
    transform: scale(1.01);
}

.rowwidth{
    width:50%
}


@media screen and (max-width: 768px) {
    .rowwidth{
        width:90%;
    }

}


</style>