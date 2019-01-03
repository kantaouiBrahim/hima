<template>
    <div class="videoContainer">
        <div v-for="(file,i) in files" :key='i'>
            <h1> {{file.slice(0,40)}}... <span @click='removeVid(i)'>x</span> </h1>
            <video width="100%" height='250px' :src="`/download/${file}`" controls></video>
        </div>
    </div>
</template>

<script>
export default {

    data(){
        return{
            files: []
        }
    },
    created(){
        this.$socket.emit('getFiles')
    },
    sockets:{
        getFiles(files){
            this.files = files.filter(file=>{
                file = file.toLowerCase()
                return file.endsWith('.mp4') || file.endsWith('.webm') 
            })
        }
    },
    methods: {
        removeVid(index){
            this.files.splice(index,1)
        }
    }
    
}
</script>




<style scoped>
    .videoContainer{
       display:flex;
       justify-content: space-around;
       flex-wrap: wrap;
    }

    .videoContainer div{
        flex:1 1 380px;
        margin-left: 10px;
    }

    h1{
        position: relative;
        background: lime!important;
        padding: 2px 5px;
    }

    span{
        cursor: pointer;
        color: red;
        position: absolute;
        right: 5px;
    }

  
</style>

