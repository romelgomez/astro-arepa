import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $rootTextContent } from '@lexical/text';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const LowPriority = 1;

function Divider() {
  return <div className='divider' />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  const handleSave = useDebouncedCallback(() => {
    const editorState = editor.getEditorState();

    editorState.read(() => {
      const htmlContent = $generateHtmlFromNodes(editor);

      const textContent = $rootTextContent();

      const lexicalContent = JSON.stringify(editorState);

      const payload = {
        html: htmlContent,
        text: textContent,
        lexical: lexicalContent,
      };

      console.log('Saving content to database:', payload);

      // TODO
      // Save the payload (htmlContent, textContent, lexicalContent) to the database
      // Example: axios.post('/save', payload);
    });
  }, 500);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(
        ({ editorState, dirtyElements, dirtyLeaves }) => {
          editorState.read(() => {
            $updateToolbar();
          });

          if (dirtyElements.size === 0 && dirtyLeaves.size === 0) {
            return;
          }

          handleSave();
        },
      ),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar, handleSave]);

  return (
    <div className='toolbar' ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className='toolbar-item spaced'
        aria-label='Undo'
        type='button'
      >
        <i className='format undo' />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className='toolbar-item'
        aria-label='Redo'
        type='button'
      >
        <i className='format redo' />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={`toolbar-item spaced ${isBold ? 'active' : ''}`}
        aria-label='Format Bold'
        type='button'
      >
        <i className='format bold' />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={`toolbar-item spaced ${isItalic ? 'active' : ''}`}
        aria-label='Format Italics'
        type='button'
      >
        <i className='format italic' />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={`toolbar-item spaced ${isUnderline ? 'active' : ''}`}
        aria-label='Format Underline'
        type='button'
      >
        <i className='format underline' />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={`toolbar-item spaced ${isStrikethrough ? 'active' : ''}`}
        aria-label='Format Strikethrough'
        type='button'
      >
        <i className='format strikethrough' />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
        className='toolbar-item spaced'
        aria-label='Left Align'
        type='button'
      >
        <i className='format left-align' />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
        className='toolbar-item spaced'
        aria-label='Center Align'
        type='button'
      >
        <i className='format center-align' />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
        className='toolbar-item spaced'
        aria-label='Right Align'
        type='button'
      >
        <i className='format right-align' />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
        className='toolbar-item'
        aria-label='Justify Align'
        type='button'
      >
        <i className='format justify-align' />
      </button>{' '}
    </div>
  );
}
