<template>
    <div id="wave">
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        
    </div>
</template>
  
<script>
export default {
    name: "Wave"
}
</script>

<style scoped>
#wave {
    margin-top: 1rem;
}

.loader {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader .stroke {
  background: #f1f1f1;
  height: 100%;
  width: 3px;
  border-radius: 50px;
  margin: 0px 5px;
  animation: animate 1.4s linear infinite;
}

@keyframes animate {
  50%{
    height: 20%;
    background: #4286f4;
  }
  100%{
    height: 100%;
  }
}


.stroke:nth-child(1) {
  animation-delay: 0s;
}
.stroke:nth-child(2) {
  animation-delay: 0.3s;
}
.stroke:nth-child(3) {
  animation-delay: 0.6s;
}
.stroke:nth-child(4) {
  animation-delay: 0.9s;
}
.stroke:nth-child(5) {
  animation-delay: 0.6s;
}
.stroke:nth-child(6) {
  animation-delay: 0.3s;
}
.stroke:nth-child(7) {
  animation-delay: 0s;
}
.stroke:nth-child(8) {
  animation-delay: 0s;
}
.stroke:nth-child(9) {
  animation-delay: 0.3s;
}
.stroke:nth-child(10) {
  animation-delay: 0.6s;
}
.stroke:nth-child(11) {
  animation-delay: 0.9s;
}
.stroke:nth-child(12) {
  animation-delay: 0.6s;
}
.stroke:nth-child(13) {
  animation-delay: 0.3s;
}
.stroke:nth-child(14) {
  animation-delay: 0s;
}
.stroke:nth-child(15) {
  animation-delay: 0s;
}
.stroke:nth-child(16) {
  animation-delay: 0.3s;
}
.stroke:nth-child(17) {
  animation-delay: 0.6s;
}
.stroke:nth-child(18) {
  animation-delay: 0.9s;
}
.stroke:nth-child(19) {
  animation-delay: 0.6s;
}
.stroke:nth-child(20) {
  animation-delay: 0.3s;
}
.stroke:nth-child(21) {
  animation-delay: 0s;
}
.stroke:nth-child(22) {
  animation-delay: 0s;
}
.stroke:nth-child(23) {
  animation-delay: 0.3s;
}
.stroke:nth-child(24) {
  animation-delay: 0.6s;
}
.stroke:nth-child(25) {
  animation-delay: 0.9s;
}
.stroke:nth-child(26) {
  animation-delay: 0.6s;
}
.stroke:nth-child(27) {
  animation-delay: 0.3s;
}
.stroke:nth-child(28) {
  animation-delay: 0s;
}
.stroke:nth-child(29) {
  animation-delay: 0s;
}
.stroke:nth-child(30) {
  animation-delay: 0.3s;
}
.stroke:nth-child(31) {
  animation-delay: 0.6s;
}
.stroke:nth-child(32) {
  animation-delay: 0.9s;
}
.stroke:nth-child(33) {
  animation-delay: 0.6s;
}
.stroke:nth-child(34) {
  animation-delay: 0.3s;
}
.stroke:nth-child(35) {
  animation-delay: 0s;
}
</style>
  