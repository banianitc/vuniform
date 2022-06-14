<template>
  <div class='tiptap-editor' v-if='editor'>
    <label :for='uid' class='pp-label'>{{ label }}</label>
    <template v-if="showInput">
      <TiptapMenuBar :editor='editor' />
      <EditorContent
        :id='uid'
        :editor='editor'
        class='tiptap-editor-content event-rich-description'
      />
      <div class='pp-input-underline' />
    </template>
    <div v-if="!showInput">
      <slot
        name="emptyValue"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { computed, getCurrentInstance, inject, useSlots, watch } from 'vue';
import { useFormsStore } from './stores/forms';
import { Highlight } from '@tiptap/extension-highlight';
import { Typography } from '@tiptap/extension-typography';
import TiptapMenuBar from './TiptapMenuBar.vue';

const formId = inject('formId', '')

interface Props {
  label?: string;
  inputId: string;
  errors?: string[];
  forceError?: boolean;
  hideEmptyInput?: boolean;
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const formsStore = useFormsStore()
formsStore.INIT_FORM_FIELD({formId, name: props.inputId, config: {}})

const value = computed(() => <string>formsStore.fieldGetValue(formId, props.inputId) || '')

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
    formsStore.STAGE_FIELD_CHANGE({value, query: {formId, field: props.inputId}})
    emit('update:modelValue', value)
  }
})


watch(value, (newVal: string) => {
  const isSame = editor.value.getHTML() === newVal
  if (isSame) {
    return
  }

  editor.value.commands.setContent(newVal, false)
})

const storeErrors = computed(() => formsStore.fieldGetErrors(formId, props.inputId) || [])
const allErrors = computed(() => storeErrors.value.concat(props.errors))

const hasError = computed(() => props.forceError || allErrors.value.length)

const uid = `pp-rich-text-input-id-${getCurrentInstance()?.uid}`

const slots = useSlots();
const showInput = computed(() => !slots.emptyValue || !props.hideEmptyInput);
</script>
