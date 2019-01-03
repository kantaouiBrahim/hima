<template>
    <v-card-text class="scrollable">
    <p v-for="(person,i) in messagesData" :key='i' :class="ltr_OR_rtl(person.name)">
        <i class="deep-orange--text"> {{person.name}}: </i>  {{person.message}} 
    </p>
    <v-alert v-show="typers.length && typer != name" v-for="typer in typers" :key='typer.name' color="success" :value="true">
       رسالة تكتب من طرف <b class="black--text">{{typer}}...</b>
    </v-alert>
    </v-card-text>
</template>
<script>
/* eslint-disable */

export default {
  name: 'messages',
  props: ['name'],
  data(){
    return{

    }
  },
  computed: {
    typers(){
      return this.$store.getters.typers
    },
    messagesData(){
      return this.$store.getters.messagesData
    }
  },
  methods:{
    ltr_OR_rtl(personName){
      const firstLetter = personName[0]
      const engRegExp = /[a-z]/i
      const isEnglish = engRegExp.test(firstLetter)
      return isEnglish? 'ltr' : 'rtl'
    }
  },
  updated () {
      const elem = this.$el
      elem.scrollTop = elem.scrollHeight
  },
  sockets:{
    addMessage(person){
      this.$store.dispatch('addMessage', person)
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
