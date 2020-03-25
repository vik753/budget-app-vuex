<template>
  <div class="budget-list-wrap">
    <ElCard :header="header">
      <el-radio-group
        class="radioGroup"
        v-model="radio"
        @change="handleBudgetListFilter"
      >
        <el-radio :label="1">All</el-radio>
        <el-radio :label="2">INCOME</el-radio>
        <el-radio :label="3">OUTCOME</el-radio>
      </el-radio-group>
      <template v-if="!isEmpty">
        <div v-for="(item, index) in this.filterList" :key="index">
          <BudgetListItem :item="item" />
        </div>
      </template>
      <ElAlert v-else type="info" :title="emptyTitle" :closable="false" />
    </ElCard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BudgetListItem from './BudgetListItem';

export default {
  name: 'BudgetList',
  components: {
    BudgetListItem,
  },
  data: () => ({
    filter: 'ALL',
    radio: 1,
    header: 'Budget List',
    emptyTitle: 'Empty list',
  }),
  computed: {
    ...mapGetters('budgetStore', ['budgetList']),
    isEmpty() {
      return !this.budgetList.length;
    },
    filterList() {
      if (this.filter === 'ALL') return this.budgetList;

      const filteredList = Object.entries(this.budgetList).filter(
        ([, val]) => val.type === this.filter
      );
      return filteredList.reduce((acc, item) => {
        acc[item[0]] = item[1];
        return acc;
      }, {});
    },
  },
  methods: {
    handleBudgetListFilter(val) {
      switch (val) {
        case 2: {
          this.filter = 'INCOME';
          break;
        }
        case 3: {
          this.filter = 'OUTCOME';
          break;
        }
        default: {
          this.filter = 'ALL';
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
.radioGroup {
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0dfdfb4;
  width: 100%;
}

.budget-list-wrap {
  max-width: 500px;
  margin: auto;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.budget-value {
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
}
</style>
