<template>
  <ElCard class="form-card">
    <ElForm
      :model="formData"
      ref="addItemForm"
      :rules="rules"
      label-position="left"
    >
      <ElFormItem label="Type" prop="type">
        <ElSelect
          class="type-select"
          v-model="formData.type"
          placeholder="Choose type..."
        >
          <ElOption label="Income" value="INCOME" />
          <ElOption label="Outcome" value="OUTCOME" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Comments" prop="comment">
        <ElInput v-model="formData.comment" />
      </ElFormItem>
      <ElFormItem label="Value" prop="value">
        <ElInput v-model.number="formData.value" />
      </ElFormItem>
      <ElButton @click="onSubmit" type="primary" plain>Submit</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Form',
  data() {
    const validateValue = (rule, value, callback) => {
      if (value === 0) {
        callback(new Error("Value can't be zero!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        type: 'INCOME',
        comment: '',
        value: 0,
      },
      rules: {
        type: [
          { required: true, message: 'Please select type', trigger: 'blur' },
        ],
        comment: [
          { required: true, message: 'Please input comment', trigger: 'blur' },
        ],
        value: [
          { required: true, message: 'Please input value', trigger: 'blur' },
          {
            type: 'number',
            message: 'Value must be a number',
            trigger: 'change',
          },
          { validator: validateValue, trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    ...mapActions('budgetStore', ['addItem']),
    onSubmit() {
      this.$refs.addItemForm.validate(valid => {
        if (valid && this.formData.value !== 0) {
          if (this.formData.type === 'OUTCOME' && this.formData.value > 0) {
            this.formData.value = -this.formData.value;
          } else if (
            this.formData.type === 'INCOME' &&
            this.formData.value < 0
          ) {
            this.formData.value = Math.abs(this.formData.value);
          }
          // this.formData -> Obj {type, comment, value}
          this.addItem(this.formData);
          this.$refs.addItemForm.resetFields();
        }
      });
    },
  },
};
</script>

<style scoped>
.form-card {
  max-width: 500px;
  margin: 0 auto 1rem;
}
.type-select {
  width: 100%;
}
</style>
