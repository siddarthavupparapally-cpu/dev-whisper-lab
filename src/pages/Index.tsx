import { useState } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { Exercise, ExerciseData } from '@/components/Exercise';
import { OutputPanel } from '@/components/OutputPanel';
import { ExerciseSelector } from '@/components/ExerciseSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockExercises } from '@/data/exercises';
import { Code2, BookOpen, Trophy, Zap } from 'lucide-react';

interface OutputResult {
  success: boolean;
  output: string;
  error?: string;
  suggestion?: string;
  executionTime?: number;
}

// Mock code execution function
const executeCode = async (code: string, expectedOutput: string): Promise<OutputResult> => {
  // Simulate execution delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Mock execution logic based on common patterns
  if (code.includes('print("Hello, World!")')) {
    return {
      success: true,
      output: 'Hello, World!',
      executionTime: Math.floor(Math.random() * 50) + 10,
    };
  }
  
  if (code.includes('def add_numbers') && code.includes('return a + b')) {
    return {
      success: true,
      output: '8',
      executionTime: Math.floor(Math.random() * 30) + 5,
    };
  }
  
  if (code.includes('FizzBuzz') || (code.includes('Fizz') && code.includes('Buzz'))) {
    return {
      success: true,
      output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      executionTime: Math.floor(Math.random() * 80) + 20,
    };
  }
  
  // Default error for incomplete code
  return {
    success: false,
    output: '',
    error: 'SyntaxError: incomplete or invalid code',
    suggestion: 'Make sure to implement all required functionality and check your syntax.',
    executionTime: Math.floor(Math.random() * 20) + 5,
  };
};

const Index = () => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseData | null>(mockExercises[0]);
  const [result, setResult] = useState<OutputResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [exercises, setExercises] = useState<ExerciseData[]>(mockExercises);

  const handleRunCode = async (code: string) => {
    if (!selectedExercise) return;
    
    setIsRunning(true);
    setResult(null);
    
    try {
      const executionResult = await executeCode(code, selectedExercise.expectedOutput);
      setResult(executionResult);
      
      // Mark exercise as completed if successful
      if (executionResult.success) {
        setExercises(prev => 
          prev.map(ex => 
            ex.id === selectedExercise.id 
              ? { ...ex, completed: true }
              : ex
          )
        );
      }
    } catch (error) {
      setResult({
        success: false,
        output: '',
        error: 'Execution failed',
        suggestion: 'Please check your code and try again.',
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSelectExercise = (exercise: ExerciseData) => {
    setSelectedExercise(exercise);
    setResult(null);
  };

  const handleResetCode = () => {
    setResult(null);
  };

  const completedCount = exercises.filter(ex => ex.completed).length;
  const progressPercentage = (completedCount / exercises.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                <Code2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">CodeLab</h1>
                <p className="text-sm text-muted-foreground">Interactive Learning Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-warning" />
                  <span className="text-foreground">{completedCount}/{exercises.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{progressPercentage.toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
          {/* Sidebar - Exercise List */}
          <div className="col-span-3">
            <Card className="h-full bg-card border-border shadow-elevated">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Learning Path
                </CardTitle>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-500 shadow-glow-primary"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <ExerciseSelector
                  exercises={exercises}
                  selectedExercise={selectedExercise}
                  onSelectExercise={handleSelectExercise}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {selectedExercise ? (
              <div className="grid grid-rows-2 gap-6 h-full">
                {/* Top Row - Exercise Description and Code Editor */}
                <div className="grid grid-cols-2 gap-6">
                  <Exercise exercise={selectedExercise} />
                  <CodeEditor
                    language={selectedExercise.language}
                    initialCode={selectedExercise.initialCode}
                    onRun={handleRunCode}
                    onReset={handleResetCode}
                    isRunning={isRunning}
                  />
                </div>

                {/* Bottom Row - Output Panel */}
                <div className="min-h-0">
                  <OutputPanel result={result} isRunning={isRunning} />
                </div>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center bg-card border-border shadow-elevated">
                <CardContent className="text-center">
                  <Code2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Select an Exercise
                  </h3>
                  <p className="text-muted-foreground">
                    Choose an exercise from the sidebar to start coding!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
