// First, install these dependencies:
// npm install @monaco-editor/react

import { useEffect, useRef } from 'react';
import Editor, { OnMount, loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

interface EditorMountParameters {
  editor: any;
  monaco: any;
}

loader.config({ monaco });

interface MonacoConfig {
  language: "javascript" | "css",
  getCode: () => string,
  updateCode: (value: string) => void;
}

const CodeEditor = ({ language, getCode, updateCode }: MonacoConfig) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // You can access the editor instance here
    editor.focus();
    
    // Example: Add custom themes or configurations
    monaco.editor.defineTheme('myCustomTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
      }
    });
    
    monaco.editor.setTheme('myCustomTheme');

    // Enable linting
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
    });

    monaco.editor.defineTheme('myCustomTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e0f57', // Change this color to your desired background color
      }
    });
    
    monaco.editor.setTheme('myCustomTheme');
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) {
      return;
    }
    console.log('Code changed:', value);
    updateCode(value);
  };

  useEffect(() => {
    if (editorRef.current) {
      console.log(language, " - ", getCode());
      // Change the language dynamically
      monaco.editor.setModelLanguage(editorRef.current.getModel(), language.toLowerCase());
    }
  }, [language]);

  return (
    <div>
      <Editor
        height="200px"
        width="630px"
        defaultLanguage={language}
        // defaultValue={language === "javascript" ? "// Write your code here!" : "<!-- Write your code here! -->"}
        value={getCode()}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          formatOnPaste: true,
          formatOnType: true,
          automaticLayout: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          folding: true,
          scrollBeyondLastLine: false,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
