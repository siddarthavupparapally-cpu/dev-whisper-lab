import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Lightbulb } from 'lucide-react';

interface OutputResult {
  success: boolean;
  output: string;
  error?: string;
  suggestion?: string;
  executionTime?: number;
}

interface OutputPanelProps {
  result: OutputResult | null;
  isRunning: boolean;
}

export const OutputPanel = ({ result, isRunning }: OutputPanelProps) => {
  if (isRunning) {
    return (
      <Card className="bg-card border-border shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
            Running Code...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">Executing your code, please wait...</div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="bg-card border-border shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-muted-foreground" />
            Output
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">Run your code to see the output here.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Status Header */}
      <Card className="bg-card border-border shadow-elevated">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
              <span>{result.success ? 'Success' : 'Error'}</span>
            </div>
            <div className="flex items-center gap-2">
              {result.executionTime && (
                <Badge variant="outline" className="text-xs">
                  {result.executionTime}ms
                </Badge>
              )}
              <Badge 
                variant={result.success ? "default" : "destructive"}
                className={result.success ? "bg-success text-success-foreground" : ""}
              >
                {result.success ? 'Passed' : 'Failed'}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Output */}
      <Card className="bg-card border-border shadow-elevated">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Output</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-code-bg border border-code-border rounded-lg p-4">
            <pre className="text-sm font-code text-foreground whitespace-pre-wrap">
              {result.output || 'No output'}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {result.error && (
        <Card className="bg-card border-border shadow-elevated">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-4 h-4" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <pre className="text-sm font-code text-destructive whitespace-pre-wrap">
                {result.error}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suggestion */}
      {result.suggestion && (
        <Card className="bg-card border-border shadow-elevated">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-warning">
              <Lightbulb className="w-4 h-4" />
              Suggestion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <p className="text-sm text-warning-foreground">{result.suggestion}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const Circle = ({ className }: { className?: string }) => (
  <div className={`w-5 h-5 rounded-full border-2 ${className}`}></div>
);