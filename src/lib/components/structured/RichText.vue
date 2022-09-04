<template>
  <Field
      v-bind='{ inputId, overrideValue, errors, forceError }'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors }'
  >
    <div class='vnf-richtext-input tiptap-editor' v-if='editor'>
      <label v-if='!hideLabel' :for='uid' class='vnf-label'>{{ label }}</label>
      <slot name='menuBar' v-bind='editor'>
        <TiptapMenuBar :editor='editor' />
      </slot>
      <EditorContent
        :id='uid'
        :editor='editor'
        class='tiptap-editor-content vnf-input'
        :class='contentClass'
      />

      <slot name='inputErrors' v-if='hasError' :errors='errors'>
        <div class='vnf-input-errors' >
          {{ errors.join(', ') }}
        </div>
      </slot>
    </div>
  </Field>
</template>

<script setup lang='ts'>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { computed, ref, watch } from 'vue';
import { Highlight } from '@tiptap/extension-highlight';
import { Typography } from '@tiptap/extension-typography';
import TiptapMenuBar from './TiptapMenuBar.vue';
import { Field } from '../../forms';

const fieldRef = ref(null);

interface Props {
  label?: string;
  inputId: string;
  errors?: string[];
  forceError?: boolean;
  hideEmptyInput?: boolean;
  hideLabel?: boolean;
  contentClass?: string;
  overrideValue?: string;
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed(() => <string>fieldRef.value?.value || '')

const editor = useEditor({
  content: value.value,
  extensions: [
      StarterKit,
      Highlight,
      Typography,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      })
  ],
  onUpdate: () => {
    const value = editor.value.getHTML()
    emit('update:modelValue', value)
    if (fieldRef.value?.updateModelValue) {
      fieldRef.value.updateModelValue(value);
    }
  }
})


watch(value, (newVal: string) => {
  const isSame = editor.value.getHTML() === newVal
  if (isSame) {
    return
  }

  editor.value.commands.setContent(newVal, false)
})
</script>
