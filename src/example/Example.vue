<template>
  <div class='vnf-container vnf-mx-auto vnf-mb-32'>
    <h1>Vuniform demo</h1>

    <div class='vnf-mx-auto vnf-my-8 vnf-w-1/2'>
      <Form
          :form-id='formId'
          :loading='loading'
          :initial-values='defaults'
          @submit.prevent='noop'
      >

        <h2 class='vnf-text-lg vnf-mb-8'>Structured</h2>

        <div class='vnf-py-2'>
          <Input
            label='Text Input'
            input-id='text_input_1'
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

        <p>Fields for <code>customScope</code></p>
        <FieldsFor name='customScope'>
          <p>First level</p>
          <Input label='Input with scope' input-id='scoped_child' />

          <FieldsFor name='deeperScope'>
            <p>Second level</p>
            <Input input-id='twice_scoped' />
          </FieldsFor>
        </FieldsFor>

        <div>
          <p>Field list:</p>
          <FieldList name='fieldList'>
            <Input input-id='field1' />
            <Input input-id='field2' />
          </FieldList>
        </div>
      </Form>

      <div class='vnf-my-8'>
        <h3>Form values:</h3>
        <pre>{{ formValues }}</pre>
      </div>
    </div>
  </div>

</template>

<script setup lang='ts'>
import { Form, useFormsStore, StructuredInput, StructuredPassword, Input } from '../lib/forms';
import Dropdown from '../lib/components/Dropdown.vue';
import Checkbox from '../lib/components/Checkbox.vue';
import Radio from '../lib/components/Radio.vue';
import TokenInput from '../lib/components/TokenInput.vue';
import Textarea from '../lib/components/Textarea.vue';
import { StructuredRichText } from '../lib/forms';
import { DateTimeInput, HiddenInput } from '../lib/forms';
import DateTimePicker from '../components/DateTimePicker.vue';
import FieldsFor from '@/components/FieldsFor.vue';
import { computed } from 'vue';
import FieldList from '@/components/FieldList.vue';

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

const formValues = computed(() => JSON.stringify(formsStore.formGetValues(formId), null, '  '))

const defaults = {
  text_input_1: "I'm a default",
  customScope: {
    scoped_child: 'Default scoped child',
    deeperScope: {
      twice_scoped: 'Twice scoped child',
    }
  },
  listed: [
      'l1',
      'l2',
  ],
  fieldList: [
    {field1: 'F1', field2: 'F2'},
    {field1: 'G1', field2: 'G2'}
  ]
}
</script>
