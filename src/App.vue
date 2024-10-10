<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { getDwmcList, getRsDetail } from '@/api/base'


import data from './data/中国医.json'
// import data from './data/大连医.json'
// import data from './data/天津医.json'
// import data from './data/徐州医科大.json'
// import data from './data/南昌大学.json'

// console.log(data);

function find(yjfxmc) {
  const a = data.filter(J=>J.yjfxmc.includes(yjfxmc)).map(K=>`${K.dwmc}: ${K.yxsmc} - ${K.yjfxmc} - ${K.nzsrsstr}`)
  return a
}

function main() {
  const form = {
    '整形': find('整形'),
  }
  console.log(form);
}

// main()
getDwmcList({
  q: '中国医科大',
  _t: 1728522310465
})
getRsDetail({
  zydm: 105111,
  zymc: '外科学',
  dwdm: 10159,
  dwlxs: ['all'],
  start: 0,
  pageSize: 10,
  totalCount: 0,
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
