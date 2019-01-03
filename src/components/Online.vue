<template>
<v-container grid-list-xs text-xs-right>
    <v-layout row>
        <v-flex xs6 offset-xs3 class="rtl">
            <v-card height="65vh" class="elevation-11">
                <v-toolbar dark class='indigo pr-3'>
                    <v-toolbar-title> المتصلون </v-toolbar-title>
                </v-toolbar>
            <v-card-text>
                <v-alert v-show="online != name" v-for="(online,i) in onlines" :key='i' :value="true" color="orange darken-4">
                    {{i}} -   {{ online }}  
                </v-alert>
                <v-alert v-show="onlines.length < 2" color="pink darken-3">
                  - - - - لا أحد - - - -
                </v-alert>
            </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>
<script>
/* eslint-disable */

export default {
    name: 'online',
    data () {
        return {

        }
    },
    computed: {
        onlines(){
            return this.$store.getters.onlines
        },
        name(){
            return localStorage.name
        }
    }
}
</script>

<style scoped>

</style>
