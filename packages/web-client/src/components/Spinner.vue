<template>
  <div class="d-flex align-items-center p-5 justify-content-center">
    <div class="spinner"></div>
  </div>
</template>

<script>
  export default {
    name: 'spinner'
  }
</script>

<style scoped>
  @keyframes spinner {
    to {transform: rotate(360deg);}
  }
  .spinner:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 3px solid gainsboro;
    border-top-color: lightskyblue;
    animation: spinner .6s linear infinite;
  }

</style>
