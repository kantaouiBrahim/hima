import Vue from "vue"
import Router from "vue-router"
import Home from "./components/Home"
import ChatRoom from "./components/ChatRoom"
import SentFiles from "./components/SentFiles"
import Online from "./components/Online"
import Uploader from "./components/Uploader"
import PreviewMedia from "./components/PreviewMedia"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { 
        keepAlive: false
       }
    },
    {
      path: "/chatRoom",
      name: "chatRoom",
      component: ChatRoom,
      meta: { 
        keepAlive: false
       }
    },
    {
      path: "/online",
      name: "online",
      component: Online,
      meta: { 
        keepAlive: false
       }
    },
    {
      path: "/sentFiles",
      name: "sentFiles",
      component: SentFiles,
      meta: { 
        keepAlive: false
       }
    },
    {
      path: "/uploader",
      name: "uploader",
      component: Uploader,
      meta: { 
        keepAlive: true
       }
    },
    {
      path: "/previewMedia",
      name: "previewMedia",
      component: PreviewMedia,
      meta: { 
        keepAlive: false
       }
    }
  ],
  mode:'history'
})
