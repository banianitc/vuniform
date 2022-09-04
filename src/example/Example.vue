<template>
  <div class='vnf-container vnf-mx-auto'>
    <h1>Vuniform demo</h1>

    <div class='vnf-mx-auto vnf-my-8 vnf-w-1/3'>
      <Form
          :form-id='formId'
          :loading='loading'
          @submit.prevent='noop'
      >

        <h2 class='vnf-text-lg vnf-mb-8'>Structured</h2>

        <div class='vnf-py-2'>
          <StructuredInput
              label='Structured Text Input'
              input-id='text_input_1'
          />
        </div>
      </Form>
    </div>
  </div>

</template>

<script setup lang='ts'>
import { Form, useFormsStore, StructuredPassword } from '../lib/forms';
import StructuredInput from '../lib/components/structured/Input.vue';

const formsStore = useFormsStore();
const formId = 'vuniform-demo';
const loading = false;

const noop = () => null;

const dropdownOptions = [
  { name: 'Option 1', value: 'opt_1' },
  { name: 'Option 2', value: 'opt_2' },
]

const radioOptions = [
  { name: 'Option 1', value: 'opt_1' },
  { name: 'Option 2', value: 'opt_2' },
]
</script>
