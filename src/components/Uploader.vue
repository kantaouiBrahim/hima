<template>
  <uploader @file-error='fileError' :options="options" @complete='complete' :fileStatusText='fileStatusText' @file-added='fileAdded' class="uploader-example">

    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <h1 class="pa-1 yellow lighten-2"> إرفع ما تشاء </h1>
      <uploader-btn> إرفع ملفات </uploader-btn>
      <uploader-btn :directory="true"> إرفع مجلدا </uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
  export default {
    data () {
      return {
        options: {
          target: '/uploads',
          testChunks: true,
          forceChunkSize: true,
          chunkSize: 1024*1024*20000
        },
        fileStatusText: {
          success: 'نجح',
          error: 'فشل',
          uploading: 'قيد الرفع',
          paused: 'متوقف مؤقتا',
          waiting: 'في الإنتظار'
        }
      }
    },
    methods: {
      fileAdded(file){
        this.$socket.emit('fileAdded', file)
      },
      complete(){
        this.$socket.emit('complete')
      },
      fileError(){
        this.$socket.emit('fileError')
      }
    }
    
  }
</script>

<style scoped>
  .uploader-example {
    width: 95vw;
    height: auto;
    background: #AAC;
    padding: 8px;
    margin: 0.3vh auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-drop{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .yellow{
    flex-basis: 90vw;
  }
  .uploader-example .uploader-btn {
    flex: 1;
    text-align: center!important;
  }
  .uploader-example .uploader-list {
    max-height: 40vh;
    overflow-x: hidden;
    overflow-y: auto;
  }

  h1{
    text-align: center!important;
    font-size: 5vmin!important;
    margin-bottom: 8px;
  }
</style>