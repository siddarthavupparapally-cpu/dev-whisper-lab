import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Star } from 'lucide-react';

export interface ExerciseData {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  initialCode: string;
  expectedOutput: string;
  hints: string[];
  completed?: boolean;
}

interface ExerciseProps {
  exercise: ExerciseData;
  className?: string;
}

const difficultyColors = {
  beginner: 'bg-success text-success-foreground',
  intermediate: 'bg-warning text-warning-foreground',
  advanced: 'bg-destructive text-destructive-foreground',
};

export const Exercise = ({ exercise, className }: ExerciseProps) => {
  return (
    <Card className={`bg-card border-border shadow-elevated ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {exercise.completed ? (
              <CheckCircle className="w-5 h-5 text-success" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground" />
            )}
            <CardTitle className="text-xl text-foreground">{exercise.title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={difficultyColors[exercise.difficulty]}>
              <Star className="w-3 h-3 mr-1" />
              {exercise.difficulty}
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {exercise.language}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Description</h4>
            <p className="text-muted-foreground leading-relaxed">{exercise.description}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-2">Expected Output</h4>
            <div className="bg-code-bg border border-code-border rounded-lg p-3">
              <pre className="text-sm font-code text-foreground">{exercise.expectedOutput}</pre>
            </div>
          </div>
          
          {exercise.hints.length > 0 && (
            <details className="group">
              <summary className="font-semibold text-foreground cursor-pointer hover:text-primary transition-colors">
                💡 Hints ({exercise.hints.length})
              </summary>
              <div className="mt-2 space-y-2">
                {exercise.hints.map((hint, index) => (
                  <div
                    key={index}
                    className="bg-muted/50 border border-border rounded-lg p-3"
                  >
                    <p className="text-sm text-muted-foreground">{hint}</p>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      </CardContent>
    </Card>
  );
};