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
import { RichTextMenuItemEnum } from '../../../util/enums';
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
  Iframe,
} from 'mdue';

interface Props {
  editor: Editor;
}
const props = defineProps<Props>()

const items = [
  {
    icon: FormatBold,
    title: RichTextMenuItemEnum.BOLD,
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive('bold'),
  },
  {
    icon: FormatItalic,
    title: RichTextMenuItemEnum.ITALIC,
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: () => props.editor.isActive('italic'),
  },
  {
    icon: FormatStrikethrough,
    title: RichTextMenuItemEnum.STRIKE,
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: () => props.editor.isActive('strike'),
  },
  {
    icon: CodeTags,
    title: RichTextMenuItemEnum.CODE,
    action: () => props.editor.chain().focus().toggleCode().run(),
    isActive: () => props.editor.isActive('code'),
  },
  {
    icon: LinkVariant,
    title: RichTextMenuItemEnum.LINK,
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
    title: RichTextMenuItemEnum.IMAGE,
    action: () => {
      let previousImg = props.editor.getAttributes('image').src;
      const url = window.prompt('Please enter image URL:', previousImg);
      if (url === null) {
        return;
      }
      props.editor.chain().focus().setImage({ src: url }).run();
    },
    isActive: () => props.editor.isActive('image'),
  },
  {
    icon: Iframe,
    title: RichTextMenuItemEnum.EMBED,
    action: () => {
      let previousIframe = props.editor.getAttributes("iframe").src;
      const url = window.prompt("Please enter link from embedded video:", previousIframe);
      if (url === null) {
        return;
      }
      props.editor
        .chain()
        .focus()
        .setIframe({ src: url })
        .run();
    },
    isActive: () => props.editor.isActive("iframe"),
  },
  {
    icon: Youtube,
    title: RichTextMenuItemEnum.YOUTUBE,
    action: () => {
      let previousYt = props.editor.getAttributes("youtube").src;
      const url = window.prompt("Please enter youtube link:", previousYt);
      if (url === null) {
        return;
      }
      props.editor
        .chain()
        .focus()
        .setYoutubeVideo({ src: url })
        .run();
    },
    isActive: () => props.editor.isActive("youtube"),
  },
  {
    title: RichTextMenuItemEnum.DIVIDER,
  },
  {
    icon: FormatHeader_1,
    title: RichTextMenuItemEnum.HEADING_1,
    action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 1 }),
  },
  {
    icon: FormatHeader_2,
    title: RichTextMenuItemEnum.HEADING_2,
    action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 2 }),
  },
  {
    icon: FormatParagraph,
    title: RichTextMenuItemEnum.PARAGRAPH,
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: () => props.editor.isActive('paragraph'),
  },
  {
    icon: FormatListBulleted,
    title: RichTextMenuItemEnum.BULLET_LIST,
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive('bulletList'),
  },
  {
    icon: FormatListNumbered,
    title: RichTextMenuItemEnum.ORDERED_LIST,
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive('orderedList'),
  },
  {
    title: RichTextMenuItemEnum.DIVIDER,
  },
  {
    icon: FormatQuoteClose,
    title: RichTextMenuItemEnum.BLOCKQUOTE,
    action: () => props.editor.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor.isActive('blockquote'),
  },
  // {
  //   icon: 'separator',
  //   title: RichTextMenuItemEnum.HORIZONTAL_RULE,
  //   action: () => props.editor.chain().focus().setHorizontalRule().run(),
  // },
  {
    title: RichTextMenuItemEnum.DIVIDER,
  },
  // {
  //   icon: 'text-wrap',
  //   title: RichTextMenuItemEnum.HARD_BREAK,
  //   action: () => props.editor.chain().focus().setHardBreak().run(),
  // },
  {
    icon: FormatClear,
    title: RichTextMenuItemEnum.CLEAR_FORMAT,
    action: () => props.editor.chain()
        .focus()
        .clearNodes()
        .unsetAllMarks()
        .run(),
  },
  {
    title: RichTextMenuItemEnum.DIVIDER,
  },
  {
    icon: Undo,
    title: RichTextMenuItemEnum.UNDO,
    action: () => props.editor.chain().focus().undo().run(),
  },
  {
    icon: Redo,
    title: RichTextMenuItemEnum.REDO,
    action: () => props.editor.chain().focus().redo().run(),
  },
]
</script>
