<template>
  <div class='container mx-auto'>
    <h1>Vuniform demo</h1>

    <div class='mx-auto my-8 w-1/3'>
      <PPForm
          :form-id='formId'
          :loading='loading'
          @submit.prevent='noop'
      >
        <div class='py-2 relative'>
          <PPDropdown
              label='Dropdown list'
              input-id='dropdown_type'
              :options='dropdownOptions'
          />
        </div>

        <div class='py-2 z-10'>
          <PPInput
              label='Text input'
              type='text'
              input-id='name'
          />
        </div>

      </PPForm>
    </div>
  </div>

</template>

<script setup lang='ts'>
import { PPForm, PPDropdown, PPInput, useFormsStore } from '@/forms';

const formsStore = useFormsStore();
const formId = 'vuniform-demo';
const loading = false;

const noop = () => null;

const dropdownOptions = [
  { name: 'Option 1', value: 'opt_1' },
  { name: 'Option 2', value: 'opt_2' },
]
</script>
