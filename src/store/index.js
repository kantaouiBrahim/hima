/* eslint-disable */

import Vue from "vue" 
import Vuex from "vuex" 
import shared from './shared'
import onlines from './onlines'
import messagesData from './messagesData'

Vue.use(Vuex) 

export default new Vuex.Store({
  
  modules:{ shared, onlines, messagesData }
   }) 