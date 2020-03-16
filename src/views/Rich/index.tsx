import * as React from 'react';
import { Editor, EditorState } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.less';
const { useState } = React;

export default function Rich() {
    const [editorState, setEditorState] = useState<EditorState | undefined>(undefined);
    const [editorHtmlState, setEditorHtmlState] = useState<string | undefined>(undefined);

    const onEditorStateChange = (state: EditorState) => {
        setEditorState(state);
        setEditorHtmlState(draftToHtml(convertToRaw(state.getCurrentContent())))
    }

    return (
        <Editor
            editorState={editorState}
            editorClassName='editorClassName'
            onEditorStateChange={(state: EditorState) => onEditorStateChange(state)}
        />
    )
}