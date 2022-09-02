<template>
  <div class='vnf-container vnf-mx-auto'>
    <h1>Vuniform demo</h1>

    <div class='vnf-mx-auto vnf-my-8 vnf-w-1/3'>
      <Form
          :form-id='formId'
          :loading='loading'
          @submit.prevent='noop'
      >

        <div class='vnf-py-2 vnf-z-10'>
          <Input
              label='Text input'
              type='text'
              input-id='text_input_1'
          />
        </div>

        <div class='vnf-py-2 vnf-relative'>
          <PPDropdown
              label='Dropdown list'
              input-id='dropdown_type'
              :options='dropdownOptions'
          />
        </div>

      </Form>
    </div>
  </div>

</template>

<script setup lang='ts'>
import { Form, PPDropdown, useFormsStore, Input } from '@/forms';

const formsStore = useFormsStore();
const formId = 'vuniform-demo';
const loading = false;

const noop = () => null;

const dropdownOptions = [
  { name: 'Option 1', value: 'opt_1' },
  { name: 'Option 2', value: 'opt_2' },
]
</script>
