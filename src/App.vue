<template>
  <div id="app">
    <v-app> 
      <app-nav></app-nav>  
      <main>
        <v-container fluid>
          <notifications width='auto'/>
          <keep-alive>
            <router-view v-if='$route.meta.keepAlive'></router-view>
          </keep-alive>
          <router-view v-if='!$route.meta.keepAlive'></router-view>
         </v-container> 
      </main>         
    </v-app>
  </div>
</template>

<script>
/* eslint-disable */
import appNav from '@/components/Nav.vue'

export default {
  name: "app",
  components: { appNav },

  data(){
    return {
      
    }
  },
  
  methods:{
    
  },
  created(){
    const { name } = localStorage
    this.$socket.emit('initState', name)
  },
  sockets:{
    initState(messagesData){
      this.$store.dispatch('initState', messagesData)
    },
    initOnlines(onlines){
      this.$store.dispatch('initOnlines', onlines)
    },
    changedName([oldName, newName]){
       
       if(oldName == newName)
        return
       this.$notify({
         text:`إن صديقك  <b>${oldName}</b> <br>  غير اسمه إلى  <b>${newName}</b> `,
         duration: 6000,
         speed: 1500
       })     
    },
    fileAdded(file, senderName){
      this.$notify({
        text: `بدأ صديقك برفع ملفات <br> الرجاء الإنتظار... <br> سنعلمك عندما يكتمل 😄`,
        duration: 6000,
        speed: 1500
      })
    },
    complete(){
      this.$notify({
        text: 'إكتمل التحميل 😃',
        duration: 6000,
        speed: 1500
      })
    },
    fileError(){
      this.$notify({
        text: 'حدث خطأ أثناء تحميل الملف 😭',
        duration: 6000,
        speed: 1500
      })
    }

  }

}
</script>

<style>
  *:not(input){
    user-select: none;
    font-size: 3.3vmin!important;
  }

  .rtl{
    direction: rtl!important;
    text-align: right!important;
  }

  .ltr{
    direction: ltr!important;
    text-align: left!important;
  }
  a{
    display: block;
    text-decoration: none;
  }

  html, body{
    overflow: hidden!important;
  }

  .notification{
    padding: 15px 25px!important; 
    max-width: 40vw!important;
    width: auto!important;
    border-radius: 12px!important;
    margin: 15px 0!important;
  }

  .notification-content, .notification-content b{
    direction: rtl!important;
    text-align: right!important;
    font-size: 2.6vmin!important;

  }

  .btn--active div{
    background: lime!important;
    color: #000;
  }

  label{
    direction: rtl!important;
    text-align: right!important;
  }
</style>
