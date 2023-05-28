export type RichTextMenuItemConfig = Array<{
  type: RichTextMenuItemEnum;
  manual?: boolean;
}>;

export enum RichTextMenuItemEnum {
  BOLD = 'Bold',
  ITALIC = 'Italic',
  STRIKE = 'Strike',
  CODE = 'Code',
  LINK = 'Link',
  IMAGE = 'Image',
  EMBED = 'TiptapEmbed',
  YOUTUBE = 'Youtube',
  DIVIDER = 'Divider',
  HEADING_1 = 'Heading 1',
  HEADING_2 = 'Heading 2',
  PARAGRAPH = 'Paragraph',
  BULLET_LIST = 'Bullet List',
  ORDERED_LIST = 'Ordered List',
  BLOCKQUOTE = 'Blockquote',
  HORIZONTAL_RULE = 'Horizontal Rule',
  HARD_BREAK = 'Hard Break',
  ALIGN_LEFT = 'Align Left',
  ALIGN_CENTER = 'Align Center',
  ALIGN_RIGHT = 'Align Right',
  ALIGN_JUSTIFY = 'Align Justify',
  CLEAR_FORMAT = 'Clear formatting',
  UNDO = 'Undo',
  REDO = 'Redo',
  COLOR = 'Color',
  UNDERLINE = 'Underline',
};
