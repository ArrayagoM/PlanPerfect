import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Sparkles, TrendingDown, Users, Shield, Zap } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: { text: string; value: string }[];
}

interface Service {
  name: string;
  logo: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Con qué frecuencia usas servicios de diseño o edición?",
    options: [
      { text: "Ocasionalmente (1-2 veces al mes)", value: "casual" },
      { text: "Varias veces por semana", value: "regular" },
      { text: "Todos los días", value: "power" },
    ],
  },
  {
    id: 2,
    text: "¿Cuántos proyectos gestionas al mes?",
    options: [
      { text: "1-3 proyectos pequeños", value: "few" },
      { text: "4-10 proyectos medianos", value: "medium" },
      { text: "Más de 10 proyectos o grandes", value: "many" },
    ],
  },
  {
    id: 3,
    text: "¿Necesitas funciones avanzadas o IA?",
    options: [
      { text: "No, las básicas son suficientes", value: "basic" },
      { text: "Algunas funciones avanzadas", value: "intermediate" },
      { text: "Sí, necesito todas las funciones premium", value: "advanced" },
    ],
  },
  {
    id: 4,
    text: "¿Trabajas en equipo o compartes acceso?",
    options: [
      { text: "Solo yo uso las herramientas", value: "solo" },
      { text: "Con 2-3 personas", value: "small-team" },
      { text: "Equipo de 4+ personas", value: "large-team" },
    ],
  },
  {
    id: 5,
    text: "¿Cuál es tu presupuesto mensual aproximado?",
    options: [
      { text: "Prefiero opciones gratuitas", value: "free" },
      { text: "Hasta $15/mes", value: "budget" },
      { text: "Más de $15/mes por valor", value: "premium" },
    ],
  },
];

const services: Service[] = [
  { name: "Canva", logo: "🎨" },
  { name: "ChatGPT", logo: "🤖" },
  { name: "CapCut", logo: "🎬" },
  { name: "Notion", logo: "📝" },
  { name: "Figma", logo: "🎯" },
  { name: "Spotify", logo: "🎵" },
  { name: "Netflix", logo: "🎬" },
  { name: "Dropbox", logo: "📦" },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"hero" | "quiz" | "results">("hero");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartQuiz = () => {
    setCurrentStep("quiz");
  };

  const handleAnswer = (value: string) => {
    setIsAnimating(true);
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnimating(false);
      } else {
        setCurrentStep("results");
        setIsAnimating(false);
      }
    }, 400);
  };

  const calculateRecommendation = () => {
    const profile = answers.join("-");
    
    if (profile.includes("casual") && profile.includes("free")) {
      return {
        plan: "Plan Básico Gratuito",
        service: "Canva Free + ChatGPT Free",
        price: "$0/mes",
        savings: "$180",
        features: [
          "Acceso a funciones básicas de diseño",
          "IA conversacional sin límites diarios",
          "Ideal para uso ocasional",
          "Sin compromiso de pago",
        ],
        alternatives: [
          { name: "Plan Starter", price: "$5/mes" },
          { name: "Plan Pro Lite", price: "$10/mes" },
        ],
      };
    } else if (profile.includes("regular") || profile.includes("medium")) {
      return {
        plan: "Plan Profesional",
        service: "Canva Pro + ChatGPT Plus",
        price: "$32/mes",
        savings: "$96",
        features: [
          "Funciones premium de diseño y edición",
          "IA avanzada con GPT-4 y análisis de imágenes",
          "Eliminación de fondos y plantillas premium",
          "Prioridad en respuestas de IA",
        ],
        alternatives: [
          { name: "Plan Solo Pro", price: "$25/mes" },
          { name: "Plan Enterprise Lite", price: "$45/mes" },
        ],
      };
    } else {
      return {
        plan: "Plan Power User",
        service: "Suite Completa Pro",
        price: "$65/mes",
        savings: "$240",
        features: [
          "Todos los servicios premium incluidos",
          "Colaboración en equipo ilimitada",
          "Almacenamiento en la nube 1TB+",
          "IA avanzada en múltiples plataformas",
          "Soporte prioritario 24/7",
        ],
        alternatives: [
          { name: "Plan Business", price: "$85/mes" },
          { name: "Plan Custom", price: "Consultar" },
        ],
      };
    }
  };

  const recommendation = currentStep === "results" ? calculateRecommendation() : null;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {currentStep === "hero" && (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTI0IDBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6bTAgMjRjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6bTI0IDBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz48L2c+PC9zdmc+')] opacity-20" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Análisis basado en patrones de uso reales</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                ¿Cansado de pagar de más?
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
                Responde 5 preguntas y descubre el plan perfecto para ti
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  size="lg"
                  onClick={handleStartQuiz}
                  className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-xl shadow-2xl hover-lift animate-pulse-soft font-semibold"
                >
                  Comenzar ahora
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
                
                <div className="flex items-center gap-2 text-white/80">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Test gratuito - Sin registro requerido</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">3,457</div>
                  <div className="text-sm text-white/80">Usuarios esta semana</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">$240</div>
                  <div className="text-sm text-white/80">Ahorro promedio</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">80%</div>
                  <div className="text-sm text-white/80">Elige mal su plan</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">2 min</div>
                  <div className="text-sm text-white/80">Test rápido</div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
      )}

      {/* Quiz Section */}
      {currentStep === "quiz" && (
        <section className="min-h-screen flex items-center justify-center py-12 px-4">
          <div className="container max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className="text-sm font-medium text-primary">
                  {Math.round(progress)}% completado
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card className={`p-8 shadow-2xl border-2 transition-all duration-400 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100 animate-fade-in"}`}>
              <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                <TrendingDown className="w-3 h-3" />
                Más del 80% elige mal su plan
              </div>

              <h2 className="text-3xl font-bold mb-8 text-foreground">
                {questions[currentQuestion].text}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-6 text-left rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 hover-lift group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center font-semibold text-primary transition-all duration-200">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-lg font-medium">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                {(3457 - currentQuestion * 234).toLocaleString()} personas encontraron su plan ideal hoy
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {currentStep === "results" && recommendation && (
        <section className="min-h-screen py-16 px-4">
          <div className="container max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">¡Análisis completado!</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Tu plan perfecto es:
              </h2>
              <p className="text-xl text-muted-foreground">
                Basado en tus respuestas, esta es la mejor opción para ti
              </p>
            </div>

            {/* Main Recommendation Card */}
            <Card className="p-8 mb-8 border-4 border-primary shadow-2xl relative overflow-hidden animate-scale-in">
              <div className="absolute top-0 right-0 px-4 py-2 bg-accent text-accent-foreground rounded-bl-xl font-bold text-sm">
                RECOMENDADO
              </div>

              <div className="mb-6">
                <h3 className="text-3xl font-bold mb-2">{recommendation.plan}</h3>
                <p className="text-lg text-muted-foreground mb-4">{recommendation.service}</p>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-primary">{recommendation.price}</span>
                  <span className="text-muted-foreground">por mes</span>
                </div>
              </div>

              <div className="mb-6 p-4 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-center gap-2 text-success font-semibold">
                  <TrendingDown className="w-5 h-5" />
                  Ahorra hasta {recommendation.savings} anuales eligiendo bien
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {recommendation.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-base">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 text-lg py-6">
                  Suscribirme ahora
                </Button>
                <Button size="lg" variant="outline" className="flex-1 text-lg py-6">
                  Ver detalles completos
                </Button>
              </div>
            </Card>

            {/* Alternatives */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Otras opciones para considerar:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {recommendation.alternatives.map((alt, idx) => (
                  <Card key={idx} className="p-6 hover-lift cursor-pointer">
                    <h4 className="text-xl font-semibold mb-2">{alt.name}</h4>
                    <p className="text-2xl font-bold text-primary mb-4">{alt.price}</p>
                    <Button variant="outline" className="w-full">
                      Comparar
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Services Showcase */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8">
                Servicios incluidos en nuestro análisis
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {services.map((service, idx) => (
                  <Card
                    key={idx}
                    className="p-6 text-center hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="text-4xl mb-2">{service.logo}</div>
                    <p className="text-sm font-medium">{service.name}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setCurrentStep("hero");
                  setCurrentQuestion(0);
                  setAnswers([]);
                }}
              >
                Volver a empezar
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
