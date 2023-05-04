<template>
  <Field
      v-bind='{ inputId, overrideValue, errors, forceError }'
      ref='fieldRef'
      v-slot='{ uid, value, hasValue, hasError, errors }'
  >
    <div class='vnf-richtext-input tiptap-editor' v-if='editor'>
      <label v-if='!hideLabel' :for='uid' class='vnf-label'>{{ label }}</label>
      <slot name='menuBar' v-bind='editor'>
        <TiptapMenuBar
          :editor="editor"
          :menu-items="menuItemsConfig"
          @mitem:click="(param) => $emit('mitem:click', param)"
        />
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
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import IFrame from '../../../util/tiptap-extensions/iframe';
import TiptapMenuBar from './TiptapMenuBar.vue';
import { Field } from '../../forms';
import { RichTextMenuItemEnum, type RichTextMenuItemConfig } from '../../../util/enums';

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
  placeholder?: string;
  menuItemsConfig?: RichTextMenuItemConfig;
}

const props = withDefaults(defineProps<Props>(), {
  menuItemsConfig: () => [
  { type: RichTextMenuItemEnum.BOLD, manual: false },
  { type: RichTextMenuItemEnum.ITALIC, manual: false },
  { type: RichTextMenuItemEnum.STRIKE, manual: false },
  { type: RichTextMenuItemEnum.CODE, manual: false },
  { type: RichTextMenuItemEnum.LINK, manual: false },
  { type: RichTextMenuItemEnum.IMAGE, manual: false },
  { type: RichTextMenuItemEnum.EMBED, manual: false },
  { type: RichTextMenuItemEnum.YOUTUBE, manual: false },
  { type: RichTextMenuItemEnum.DIVIDER, manual: false },
  { type: RichTextMenuItemEnum.HEADING_1, manual: false },
  { type: RichTextMenuItemEnum.HEADING_2, manual: false },
  { type: RichTextMenuItemEnum.PARAGRAPH, manual: false },
  { type: RichTextMenuItemEnum.BULLET_LIST, manual: false },
  { type: RichTextMenuItemEnum.ORDERED_LIST, manual: false },
  { type: RichTextMenuItemEnum.DIVIDER, manual: false },
  { type: RichTextMenuItemEnum.BLOCKQUOTE, manual: false },
  { type: RichTextMenuItemEnum.DIVIDER, manual: false },
  { type: RichTextMenuItemEnum.CLEAR_FORMAT, manual: false },
  { type: RichTextMenuItemEnum.DIVIDER, manual: false },
  { type: RichTextMenuItemEnum.UNDO, manual: false },
  { type: RichTextMenuItemEnum.REDO, manual: false },
],
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'mitem:click', payload: { type: RichTextMenuItemEnum, action: Function }): void
}>()

const value = computed(() => <string>fieldRef.value?.value || '')

const editor = useEditor({
  content: value.value,
  extensions: [
    StarterKit,
    Highlight,
    Typography,
    TextStyle,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Color.configure({
      types: ['textStyle'],
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      linkOnPaste: true,
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    Image,
    Youtube.configure({
      controls: false,
    }),
    IFrame,
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
