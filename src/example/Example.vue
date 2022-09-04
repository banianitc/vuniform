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

        <div class='vnf-py-2'>
          <StructuredPassword
              label='Structured Password Input'
              :showable='true'
              input-id='password'
          />
        </div>


        <hr>

        <div class='vnf-py-2'>
          <Dropdown
              label='Dropdown'
              input-id='dropdown'
              :options='dropdownOptions'
          />
        </div>

        <div class='vnf-py-2'>
          <Checkbox
              label='checkbox'
              input-id='checkbox'
          />
        </div>

        <div class='vnf-py-2'>
          <Radio
              label='Radio'
              input-id='radio'
              :options='radioOptions'
          />
        </div>

        <div class='vnf-py-2'>
          <TokenInput
              label='Token input'
              input-id='token_input'
          />
        </div>

        <div class='vnf-py-2'>
          <Textarea
              label='Text area'
              input-id='textarea'
          />
        </div>

        <div class='vnf-py-2'>
          <StructuredRichText
              label='Rich Text area'
              input-id='richtext'
          />
        </div>

      </Form>
    </div>
  </div>

</template>

<script setup lang='ts'>
import { Form, useFormsStore, StructuredInput, StructuredPassword } from '../forms';
import Dropdown from '../components/structured/Dropdown.vue';
import Checkbox from '../components/structured/Checkbox.vue';
import Radio from '../components/structured/Radio.vue';
import TokenInput from '../components/structured/TokenInput.vue';
import Textarea from '../components/structured/Textarea.vue';
import { StructuredRichText } from '../forms';

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
