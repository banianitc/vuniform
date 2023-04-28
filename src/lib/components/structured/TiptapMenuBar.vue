<template>
  <div class='menu-bar'>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />
      <menu-item tabindex='-1' v-else :key="index" v-bind="item" />
    </template>
  </div>
</template>

<script setup lang='ts'>
import MenuItem from './TiptapMenuItem.vue';
import type { Editor } from '@tiptap/vue-3';
import {
  CodeTags,
  FormatBold,
  FormatClear,
  FormatHeader_1,
  FormatHeader_2,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatParagraph,
  FormatQuoteClose,
  FormatStrikethrough,
  LinkVariant,
  Redo,
  Undo,
  Image,
} from 'mdue';

interface Props {
  editor: Editor;
}
const props = defineProps<Props>()

const items = [
  {
    icon: FormatBold,
    title: 'Bold',
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive('bold'),
  },
  {
    icon: FormatItalic,
    title: 'Italic',
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: () => props.editor.isActive('italic'),
  },
  {
    icon: FormatStrikethrough,
    title: 'Strike',
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: () => props.editor.isActive('strike'),
  },
  {
    icon: CodeTags,
    title: 'Code',
    action: () => props.editor.chain().focus().toggleCode().run(),
    isActive: () => props.editor.isActive('code'),
  },
  {
    icon: LinkVariant,
    title: 'Link',
    action: () => {
      const previousUrl = props.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      if (url === null) {
        return
      }

      if (url === '') {
        props.editor.chain().focus().extendMarkRange('link').unsetLink().run()
        return
      }

      props.editor.chain().focus().extendMarkRange('link').setLink({href: url}).run()
    },
    isActive: () => props.editor.isActive('highlight'),
  },
  {
    icon: Image,
    title: 'Image',
    action: () => {
      let previousImg = props.editor.getAttributes('image').src;
      const url = window.prompt('URL', previousImg);
      if (url === null) {
        return;
      }
      props.editor.chain().focus().setImage({ src: url }).run();
    },
    isActive: () => props.editor.isActive('highlight'),
  },
  {
    type: 'divider',
  },
  {
    icon: FormatHeader_1,
    title: 'Heading 1',
    action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 1 }),
  },
  {
    icon: FormatHeader_2,
    title: 'Heading 2',
    action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 2 }),
  },
  {
    icon: FormatParagraph,
    title: 'Paragraph',
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: () => props.editor.isActive('paragraph'),
  },
  {
    icon: FormatListBulleted,
    title: 'Bullet List',
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive('bulletList'),
  },
  {
    icon: FormatListNumbered,
    title: 'Ordered List',
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive('orderedList'),
  },
  {
    type: 'divider',
  },
  {
    icon: FormatQuoteClose,
    title: 'Blockquote',
    action: () => props.editor.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor.isActive('blockquote'),
  },
  // {
  //   icon: 'separator',
  //   title: 'Horizontal Rule',
  //   action: () => props.editor.chain().focus().setHorizontalRule().run(),
  // },
  {
    type: 'divider',
  },
  // {
  //   icon: 'text-wrap',
  //   title: 'Hard Break',
  //   action: () => props.editor.chain().focus().setHardBreak().run(),
  // },
  {
    icon: FormatClear,
    title: 'Clear Format',
    action: () => props.editor.chain()
        .focus()
        .clearNodes()
        .unsetAllMarks()
        .run(),
  },
  {
    type: 'divider',
  },
  {
    icon: Undo,
    title: 'Undo',
    action: () => props.editor.chain().focus().undo().run(),
  },
  {
    icon: Redo,
    title: 'Redo',
    action: () => props.editor.chain().focus().redo().run(),
  },
]
</script>
