import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { useEffect } from 'react';

const fixedState =
  '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"this is a fixed value load from the state component","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}';

export default function LoadState() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const newState = editor.parseEditorState(fixedState);
    editor.setEditorState(newState);
    editor.setEditable(true);
  }, [editor]);

  return <></>;
}
