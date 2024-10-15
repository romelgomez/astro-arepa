import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import React from 'react';
import LoadState from './LoadState';
import ExampleTheme from './Theme';
import ToolbarPlugin from './ToolbarPlugin';
import TreeViewPlugin from './TreeViewPlugin';

const placeholder = 'Enter some rich text...';

const editorConfig = {
  namespace: 'React.js Demo',
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
  editable: false,
};

function LexicalEditor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className='editor-container'>
        <LoadState />
        <ToolbarPlugin />
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className='editor-input'
                aria-placeholder={placeholder}
                placeholder={
                  <div className='editor-placeholder'>{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>

        <div className='editor-tree'>
          <TreeViewPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}

export default LexicalEditor;
