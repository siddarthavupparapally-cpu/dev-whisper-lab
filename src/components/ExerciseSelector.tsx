import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExerciseData } from './Exercise';
import { CheckCircle, Circle, Play } from 'lucide-react';

interface ExerciseSelectorProps {
  exercises: ExerciseData[];
  selectedExercise: ExerciseData | null;
  onSelectExercise: (exercise: ExerciseData) => void;
}

const difficultyColors = {
  beginner: 'bg-success/20 text-success border-success/30',
  intermediate: 'bg-warning/20 text-warning border-warning/30',
  advanced: 'bg-destructive/20 text-destructive border-destructive/30',
};

export const ExerciseSelector = ({ 
  exercises, 
  selectedExercise, 
  onSelectExercise 
}: ExerciseSelectorProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-foreground mb-4">Exercises</h3>
      {exercises.map((exercise) => (
        <Card 
          key={exercise.id}
          className={`transition-all cursor-pointer border-border hover:shadow-glow-primary/20 ${
            selectedExercise?.id === exercise.id 
              ? 'bg-primary/10 border-primary/30 shadow-glow-primary/30' 
              : 'bg-card hover:bg-card/80'
          }`}
          onClick={() => onSelectExercise(exercise)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {exercise.completed ? (
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-foreground truncate">
                    {exercise.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${difficultyColors[exercise.difficulty]}`}
                    >
                      {exercise.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-muted">
                      {exercise.language}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {selectedExercise?.id === exercise.id && (
                <Button size="sm" variant="ghost" className="flex-shrink-0">
                  <Play className="w-3 h-3" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};