import { useState, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  language: string;
  initialCode: string;
  onRun: (code: string) => void;
  onReset?: () => void;
  isRunning?: boolean;
}

export const CodeEditor = ({ 
  language, 
  initialCode, 
  onRun, 
  onReset, 
  isRunning = false 
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleRun = () => {
    if (editorRef.current) {
      const currentCode = editorRef.current.getValue();
      onRun(currentCode);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    onReset?.();
  };

  return (
    <Card className="h-full flex flex-col bg-code-bg border-code-border shadow-elevated">
      <div className="flex items-center justify-between p-4 border-b border-code-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <div className="w-3 h-3 rounded-full bg-success"></div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-8 px-3 border-code-border hover:bg-secondary"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleRun}
            disabled={isRunning}
            className="h-8 px-4 bg-gradient-primary shadow-glow-primary"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={language.toLowerCase()}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
          }}
        />
      </div>
    </Card>
  );
};