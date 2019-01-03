<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="rtl">
        <v-card class="elevation-8">
          <v-toolbar dark dense class="blue accent-4 pr-3" >
            <v-toolbar-title> قاعة الدردشة </v-toolbar-title>
            <v-spacer></v-spacer>
             <v-btn flat @click="hasName=false">
              <v-icon right>edit</v-icon>  تعديل الإسم
            </v-btn>
          </v-toolbar>
         <messages :name='name'/>
          <v-divider></v-divider>
          <v-card-actions>
            <v-text-field
              v-show="!hasName"
              :class='ltr_OR_rtl(name)'
              label="الإسم"
              text-xs-right
              v-model="name"
              @keyup.enter='saveName'
            ></v-text-field>
            <v-text-field
              v-show="hasName"
              :class='ltr_OR_rtl(message)'
              @blur="removeTyper"
              @focus="addTyper"
              @keyup.enter='addMessage'
              name="name"
              label="الرسالة"
              text-xs-right
              right
              multi-line
              no-resize
              hide-details
              justify-center
              rows='3'
              v-model="message"
            ></v-text-field>
          </v-card-actions>
          
            <v-btn flat to="/online" >
              <v-icon right >contact_mail</v-icon>
            </v-btn>
            <v-btn flat to='/uploader'>
              <v-icon right>cloud_upload</v-icon>
            </v-btn>
            <v-btn flat to='/sentFiles'>
              <v-icon right>cloud_download</v-icon>
            </v-btn>
            <v-btn flat to='/previewMedia'>
              <v-icon right>videocam</v-icon>
            </v-btn>
        </v-card>
      </v-flex>
      
    </v-layout>
    
  </v-container>
</template>
<script>
/* eslint-disable */
import messages from './Messages'
export default {
  name: 'chatRoom',
  components: { messages },
  data(){
    return{
      name: '',
      message: '',
      hasName: false
    }
  },
  created() {
    this.name = localStorage.name || ''
    this.hasName = Boolean(localStorage.name)
  },
  watch: {
    message(v){
      if(!v){
        this.removeTyper()
        return
      }

      const alreadyTyping = this.typers.includes(this.name)

      if(alreadyTyping)
        return
      this.addTyper()
    }
  },
  computed: {
    typers(){
      return this.$store.getters.typers
    },
    onlines(){
      return this.$store.getters.onlines
    }
  },
  methods:{
    saveName(){
        if(!this.name)
          return

        localStorage.name = this.name
        this.hasName = true
        this.$socket.emit('newName', this.name)
    },
    addMessage(){
      if(!this.message)
        return

      this.$socket.emit('addMessage', {
        name: this.name,
        message: this.message
      })
      this.message = ''
    },
    removeTyper(){
      this.$socket.emit('removeTyper', this.name)
    },
    addTyper(){
      if(!this.message)
        return
      this.$socket.emit('addTyper', this.name)
    },
    ltr_OR_rtl(mesaage){
      const firstLetter = mesaage[0]
      const engRegExp = /[a-z]/i
      const isEnglish = engRegExp.test(firstLetter)
      return isEnglish? 'ltr' : 'rtl'
    }
  },
  sockets:{
    addTyper(typer){
      this.$store.dispatch('addTyper', typer)
    },
    removeTyper(typer){
      this.$store.dispatch('removeTyper', typer)
    }
  }
}
</script>

<style scoped>
  .scrollable{
    overflow-y: scroll;
    height: 45vh;
  }


</style>
