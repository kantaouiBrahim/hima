<template>
<v-container grid-list-xs text-xs-right>
    <v-layout row>
        <v-flex xs12 class="rtl">
            <v-card class="elevation-11 grey darken-3">
              <v-toolbar dense dark class='indigo pr-3'>
                <v-toolbar-title> الملفات المرسلة </v-toolbar-title>
              </v-toolbar>       
              <v-card-text id="files" v-if='filteredFiles.length'>
                <a download :class="ltr_OR_rtl(filename)" v-for="(filename, i) in filteredFiles" :key='i' :href="`/download/${filename}`"> {{ filename.split('.')[0] }} </a>
              </v-card-text>
              <v-card-text v-else class="red">
                لا يوجد شيء
              </v-card-text>
              <v-card-actions class='grey lighten-4'>
                <v-btn icon @click='changeFilter("all")'>
                    <v-icon>done_all</v-icon>
                </v-btn>
                <v-btn icon @click='changeFilter(dataTypes["image"])'>
                   <v-icon>image</v-icon>
                </v-btn>
                <v-btn icon @click='changeFilter(dataTypes["audio"])'>
                    <v-icon>audiotrack</v-icon>
                </v-btn>
                <v-btn icon @click='changeFilter(dataTypes["video"])'>
                  <v-icon>videocam</v-icon>
                </v-btn>
                <v-btn icon @click='changeFilter(dataTypes["archive"])'>
                   <v-icon>archive</v-icon>
                </v-btn>
                <v-btn  icon @click='changeFilter(dataTypes["app"])'>
                   <v-icon>attach_file</v-icon>
                </v-btn>
                <v-btn icon @click='changeFilter("other")'>
                  <v-icon>announcement</v-icon>
                </v-btn>
              </v-card-actions>
            
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
/* eslint-disable */
import dataTypes from '../datatypes'
export default {
  name: 'sentFiles',
  data () {
    return {
      files: [],
      dataTypes,
      filteredFiles: []
    }
  },
  sockets:{
    getFiles(files){
      this.files = files
      this.filteredFiles = files
    }
  },
  created(){
    this.$socket.emit('getFiles')
  },
  methods:{
    ltr_OR_rtl(filename){
      const firstLetter = filename[0]
      const engRegExp = /[a-z]/i
      const isEnglish = engRegExp.test(firstLetter)
      return isEnglish? 'ltr' : 'rtl'
    },
    changeFilter(fil){
      if(fil == 'all')
          return this.filteredFiles = this.files

      this.filteredFiles = this.files.filter(file =>{
        
        const last5Letters = file.slice(file.length-6)
        const endWith = last5Letters.split('.')[1]

        if(fil == 'other')
          return !(endWith in this.dataTypes.other)
                
        return endWith in fil

      })
    }
  },
  computed:{
    
  }
  
}
</script>

<style scoped>
  a{
    margin: 2px 0;
    background: #CC8;
    padding: 8px;
    border-radius: 3px;
    transform: scale(0.9);
    transition: transform 0.3s; 
  }

  a:hover, a:focus{
    background: #FFB;
    transform: scale(1)
  }
  #files{
    overflow-x: hidden;
    overflow-y: scroll;
    height: auto;
    max-height: 55vh;
  }

  .card__actions{
    display: flex!important;
  }

  .card__actions>*{
    flex: 1!important;
  }
</style>
