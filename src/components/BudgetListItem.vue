<template>
  <div>
    <div class="list-item">
      <span class="budget-comment">{{ item.comment }} </span>
      <span
        class="budget-value"
        :class="
          item.type === 'INCOME'
            ? 'el-icon-top color-income'
            : 'el-icon-bottom color-outcome'
        "
        >{{ item.value }}</span
      >
      <ElButton
        type="danger"
        size="mini"
        plain
        @click="showDeleteDialog(item.id)"
      >
        Delete
      </ElButton>
    </div>
    <el-dialog
      title="Delete item dialog"
      :visible.sync="dialogVisible"
      width="30%"
      :show-close="showDialogClose"
    >
      <span>Do you really want to delete this item?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="deleteItemHandler"
          >Delete item</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BudgetListItem',
  data: () => ({
    dialogVisible: false,
    showDialogClose: false,
    deleteItemId: null,
  }),
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions('budgetStore', ['deleteItem']),
    deleteItemHandler() {
      if (this.deleteItemId === null) return;
      this.deleteItem(this.deleteItemId);
      // this.$emit('deleteItem', this.deleteItemId);
      this.deleteItemId = null;
      this.dialogVisible = false;
    },
    showDeleteDialog(id) {
      this.deleteItemId = id;
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.budget-list-wrap {
  max-width: 500px;
  margin: auto;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.color-income {
  color: rgba(29, 192, 14, 0.548);
}

.color-outcome {
  color: rgba(219, 13, 13, 0.918);
}

.budget-value {
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
}
</style>
