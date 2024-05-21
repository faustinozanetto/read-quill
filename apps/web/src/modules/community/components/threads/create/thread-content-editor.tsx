'use client';

import React from 'react';

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  Separator,
  BlockTypeSelect,
  InsertTable,
  InsertImage,
  imagePlugin,
  tablePlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface ThreadContentEditorProps extends MDXEditorProps {
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const ThreadContentEditor: React.FC<ThreadContentEditorProps> = (props) => {
  const { editorRef, ...rest } = props;

  return (
    <MDXEditor
      ref={editorRef}
      plugins={[
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        // imagePlugin({
        //   imageUploadHandler: (file) => {
        //     const reader = new FileReader();
        //     let result = 'https://picsum.photos/200/300';
        //     reader.onload = (e) => {
        //       const base64URL = e.target.result; // Get the base64 URL
        //       result = base64URL;
        //     };
        //     reader.readAsDataURL(file);

        //     return Promise.resolve(result);
        //   },

        //   imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200'],
        // }),
        tablePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <Separator />
              <BlockTypeSelect />
              <InsertTable />
              {/* <InsertImage /> */}
            </>
          ),
        }),
      ]}
      {...rest}
    />
  );
};

export default ThreadContentEditor;
