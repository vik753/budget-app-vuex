<template>
  <div id="app">
    <BudgetList />
  </div>
</template>

<script>
import BudgetList from './components/BudgetList.vue';

export default {
  name: 'App',
  components: {
    BudgetList,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
