<template>
  <div class="menu-bar">
    <template v-for="(item, index) in menuItemsCalculated">
      <div
        class="divider"
        v-if="item.type === RichTextMenuItemEnum.DIVIDER"
        :key="`divider${index}`"
      />
      <input
        v-else-if="item.type === RichTextMenuItemEnum.COLOR"
        type="color"
        @input="editor.chain().focus().setColor($event.target.value).run()"
        :value="editor.getAttributes('textStyle').color"
      />
      <menu-item
        tabindex="-1"
        v-else
        :key="index"
        v-bind="item"
        @mitem:click="(param) => $emit('mitem:click', param)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import MenuItem from './TiptapMenuItem.vue';
import {
  RichTextMenuItemEnum,
  type RichTextMenuItemConfig,
} from '../../../util/enums';
import { EmbedType } from '@vp/tiptap-embed';
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
  FormatTextWrappingWrap,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  FormatUnderline,
  LinkVariant,
  Minus,
  Redo,
  Undo,
  Image,
  Iframe,
  Youtube,
} from 'mdue';

interface Props {
  editor: Editor;
  menuItems?: RichTextMenuItemConfig;
}

const emit = defineEmits<{
  (
    e: 'mitem:click',
    payload: { type: RichTextMenuItemEnum; action: Function }
  ): void;
}>();
const props = defineProps<Props>();

const menuItemTemplate = [
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
      const previousUrl = props.editor.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);

      if (url === null) {
        return;
      }

      if (url === '') {
        props.editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }

      props.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    },
    isActive: () => props.editor.isActive('highlight'),
  },
  {
    icon: Image,
    title: RichTextMenuItemEnum.IMAGE,
    action: (url?: string) => {
      let inputUrl = url;
      if (!url) {
        let previousIframe = props.editor.getAttributes('image').src;
        inputUrl = window.prompt(
          'Please enter image URL:',
          previousIframe
        );
        if (inputUrl === null) {
          return;
        }
      }
      props.editor.chain().focus().setImage({ src: inputUrl }).run();
    },
    isActive: () => props.editor.isActive('image'),
  },
  {
    icon: Iframe,
    title: RichTextMenuItemEnum.EMBED,
    action: (url?: string, type?: EmbedType) => {
      let inputCode = url;
      if (!url) {
        let previousIframe: string;
        inputCode = window.prompt('Please enter embed code:', previousIframe);
        if (inputCode === null) {
          return;
        }
      }
      props.editor.chain().focus().setEmbed(inputCode, type).run();
    },
    isActive: () => props.editor.isActive('tiptapEmbed'),
  },
  {
    icon: Youtube,
    title: RichTextMenuItemEnum.YOUTUBE,
    action: (url?: string, config = {}) => {
      let inputUrl = url;
      if (!url) {
        let previousIframe = props.editor.getAttributes('youtube').src;
        inputUrl = window.prompt('Please enter youtube link:', previousIframe);
        if (inputUrl === null) {
          return;
        }
      }
      props.editor
        .chain()
        .focus()
        .setYoutubeVideo({ src: inputUrl, ...config })
        .run();
    },
    isActive: () => props.editor.isActive('youtube'),
  },
  {
    title: RichTextMenuItemEnum.DIVIDER,
  },
  {
    icon: FormatUnderline,
    title: RichTextMenuItemEnum.UNDERLINE,
    action: () => props.editor.chain().focus().toggleUnderline().run(),
    isActive: () => props.editor.isActive('underline'),
  },
  {
    icon: FormatHeader_1,
    title: RichTextMenuItemEnum.HEADING_1,
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 1 }),
  },
  {
    icon: FormatHeader_2,
    title: RichTextMenuItemEnum.HEADING_2,
    action: () =>
      props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
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
    icon: FormatQuoteClose,
    title: RichTextMenuItemEnum.BLOCKQUOTE,
    action: () => props.editor.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor.isActive('blockquote'),
  },
  {
    icon: Minus,
    title: RichTextMenuItemEnum.HORIZONTAL_RULE,
    action: () => props.editor.chain().focus().setHorizontalRule().run(),
  },
  {
    icon: FormatTextWrappingWrap,
    title: RichTextMenuItemEnum.HARD_BREAK,
    action: () => props.editor.chain().focus().setHardBreak().run(),
  },
  {
    icon: FormatAlignLeft,
    title: RichTextMenuItemEnum.ALIGN_LEFT,
    action: () => {
      if (props.editor.state.selection?.node?.type?.name === 'tiptapEmbed') {
        return props.editor.chain().focus().setEmbedAlign('flex-start').run();
      }
      return props.editor.chain().focus().setTextAlign('left').run();
    },
    isActive: () => props.editor.isActive('left'),
  },
  {
    icon: FormatAlignCenter,
    title: RichTextMenuItemEnum.ALIGN_CENTER,
    action: () => {
      if (props.editor.state.selection?.node?.type?.name === 'tiptapEmbed') {
        return props.editor.chain().focus().setEmbedAlign('center').run();
      }
      return props.editor.chain().focus().setTextAlign('center').run();
    },
    isActive: () => props.editor.isActive('center'),
  },
  {
    icon: FormatAlignRight,
    title: RichTextMenuItemEnum.ALIGN_RIGHT,
    action: () => {
      if (props.editor.state.selection?.node?.type?.name === 'tiptapEmbed') {
        return props.editor.chain().focus().setEmbedAlign('flex-end').run();
      }
      return props.editor.chain().focus().setTextAlign('right').run();
    },
    isActive: () => props.editor.isActive('right'),
  },
  {
    icon: FormatAlignJustify,
    title: RichTextMenuItemEnum.ALIGN_JUSTIFY,
    action: () => props.editor.chain().focus().setTextAlign('justify').run(),
    isActive: () => props.editor.isActive('justify'),
  },
  {
    icon: FormatClear,
    title: RichTextMenuItemEnum.CLEAR_FORMAT,
    action: () =>
      props.editor
        .chain()
        .focus()
        .clearNodes()
        .unsetAllMarks()
        .unsetTextAlign()
        .unsetEmbedAlign()
        .run(),
  },
  {
    title: RichTextMenuItemEnum.COLOR,
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
];

const menuItemsCalculated = computed(() => {
  return props.menuItems.map((x) => {
    const foundItem =
      menuItemTemplate.find((item) => item.title === x.type) || {};
    return Object.assign({}, { ...foundItem }, { ...x });
  });
});
</script>
