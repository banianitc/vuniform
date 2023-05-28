<template>
  <div class='vnf-container vnf-mx-auto'>
    <h1>Vuniform demo</h1>

    <div class='vnf-mx-auto vnf-my-8 vnf-w-1/2'>
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
              placeholder='Rich text placeholder'
          />
        </div>

        <div class='vnf-py-2'>
          <DateTimeInput
              label='Date and time'
              input-id='datetime'
          >
            <template #dateTimePicker='{ value, showDateTimePicker, hideTimePicker, uid, autoSelect, onUpdate, onClose }'>
              <DateTimePicker
                  class='vnf-min-h-4'
                  :model-value='value'
                  :show='showDateTimePicker'
                  :disable-time-section='hideTimePicker'
                  :el-id='uid'
                  :auto-select='autoSelect'
                  @update:modelValue='onUpdate'
                  @close='onClose'
              />
            </template>
          </DateTimeInput>
        </div>

        <div class='vnf-py-2'>
          <p>Hidden input</p>
          <HiddenInput input-id='hidden' />
        </div>
      </Form>
    </div>
  </div>

</template>

<script setup lang='ts'>
import { Form, useFormsStore, StructuredInput, StructuredPassword } from '../lib/forms';
import Dropdown from '../lib/components/structured/Dropdown.vue';
import Checkbox from '../lib/components/structured/Checkbox.vue';
import Radio from '../lib/components/structured/Radio.vue';
import TokenInput from '../lib/components/structured/TokenInput.vue';
import Textarea from '../lib/components/structured/Textarea.vue';
import { StructuredRichText } from '../lib/forms';
import { DateTimeInput, HiddenInput } from '../lib/forms';
import DateTimePicker from '../components/DateTimePicker.vue';

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
