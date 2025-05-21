
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flower, Heart, Sun, Moon, FlowerIcon, HeartPulse, Star, Ear, Leaf, Eye, CandlestickChart, Hand, Magnet, Home, Brain, Sparkles, Music, MoonIcon } from 'lucide-react';

const ServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}> = ({ icon, title, description }) => {
  return (
    <Card className="holistic-card">
      <CardHeader>
        <div className="mb-4 bg-holistic-lavender w-12 h-12 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <CardTitle className="holistic-heading text-xl">{title}</CardTitle>
        <CardDescription className="text-holistic-dark/70">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-holistic-dark/80"></p>
      </CardContent>
    </Card>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <Flower className="h-6 w-6 text-holistic-purple" />,
      title: "Pack holístico 22 cursos",
      description: (
        <ul className="list-disc pl-5 text-sm text-holistic-dark/80">
          <li>Runas</li>
          <li>Magia e interpretación con velas</li>
          <li>Registros akáshicos</li>
          <li>Vidas pasadas, karma y Dharma</li>
          <li>Limpieza energética</li>
          <li>Corte de cordones energéticos</li>
          <li>Constestaciones familiares</li>
          <li>Los Chakras y aura</li>
          <li>Radiestesia</li>
          <li>Hoponopono</li>
          <li>Gemoterapia</li>
          <li>Sanación con ángeles</li>
          <li>Péndulo hebreo</li>
          <li>Sanación árbol genealógico</li>
          <li>Flores de Bach</li>
          <li>Rocío áurico y sahumos</li>
          <li>Sanación niño interior</li>
          <li>Ayurveda</li>
          <li>Sanación popular</li>
          <li>Magia wicca</li>
          <li>Biodescodificación</li>
          <li>Sanación linaje femenino y rito del útero</li>
        </ul>
      )
    },
    {
      icon: <Heart className="h-6 w-6 text-holistic-purple" />,
      title: "Taller aprender a meditar",
      description: "Descubre cómo meditar con técnicas simples para calmar la mente, reducir el estrés y conectar contigo."
    },
    {
      icon: <Sun className="h-6 w-6 text-holistic-purple" />,
      title: "Yoga",
      description: "Aprende yoga con técnicas para equilibrar cuerpo y mente, mejorar tu bienestar y conectar contigo."
    },
    {
      icon: <Moon className="h-6 w-6 text-holistic-purple" />,
      title: "Barras de access",
      description: "Descubre Barras de Access para liberar bloqueos, relajar la mente y potenciar el bienestar en tu vida."
    },
    {
      icon: <Sun className="h-6 w-6 text-holistic-purple" />,
      title: "Astrología y Numerología",
      description: "Explora Astrología y Numerología para comprender tu energía, descubrir tu propósito y armonizar tu vida."
    },
    {
      icon: <Heart className="h-6 w-6 text-holistic-purple" />,
      title: "Reiki",
      description: "Experimenta Reiki para equilibrar tu energía, reducir el estrés y promover sanación y bienestar integral."
    },
    {
      icon: <Flower className="h-6 w-6 text-holistic-purple" />,
      title: "Reflexología",
      description: "Descubre la Reflexología para aliviar tensiones, mejorar tu bienestar y equilibrar tu energía a través de los pies."
    },
    {
      icon: <Moon className="h-6 w-6 text-holistic-purple" />,
      title: "Mesa Radiónica y Radiestesia",
      description: "Aprende a usar la Mesa Radiónica y la Radiestesia para armonizar energías y potenciar la sanación."
    },
    {
      icon: <Music className="h-6 w-6 text-holistic-purple" />,
      title: "Cuencos Tibetanos y Musicoterapia",
      description: "Explora la vibración de los cuencos tibetanos y la musicoterapia para relajar tu mente y equilibrar tu energía."
    },
    {
      icon: <MoonIcon className="h-6 w-6 text-holistic-purple" />,
      title: "Tarot Marsella",
      description: "Aprende el arte del Tarot de Marsella para obtener claridad, guía espiritual y respuestas a tus inquietudes."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-holistic-purple" />,
      title: "Sanación Pránica",
      description: "Descubre la Sanación Pránica para limpiar, equilibrar y fortalecer tu campo energético de manera natural."
    },
    {
      icon: <Brain className="h-6 w-6 text-holistic-purple" />,
      title: "Hipnosis y Regresiones",
      description: "Explora la Hipnosis y las Regresiones para acceder a memorias profundas y liberar bloqueos emocionales."
    },
    {
      icon: <Home className="h-6 w-6 text-holistic-purple" />,
      title: "Feng Shui",
      description: "Aprende Feng Shui para armonizar espacios, equilibrar energías y atraer bienestar a tu vida."
    },
    {
      icon: <Magnet className="h-6 w-6 text-holistic-purple" />,
      title: "Biomagnetismo",
      description: "Descubre el Biomagnetismo para equilibrar el pH del cuerpo, fortalecer la salud y liberar bloqueos energéticos."
    },
    {
      icon: <Hand className="h-6 w-6 text-holistic-purple" />,
      title: "Tapping EFT",
      description: "Aprende Tapping EFT para liberar emociones bloqueadas, reducir el estrés y mejorar tu bienestar emocional."
    },
    {
      icon: <CandlestickChart className="h-6 w-6 text-holistic-purple" />,
      title: "Velomancia",
      description: "Explora la Velomancia para interpretar mensajes a través de las velas y potenciar la intuición en tu vida."
    },
    {
      icon: <Eye className="h-6 w-6 text-holistic-purple" />,
      title: "Activación Glándula Pineal",
      description: "Descubre cómo activar tu glándula pineal para expandir tu percepción, aumentar tu intuición y elevar tu conciencia."
    },
    {
      icon: <Leaf className="h-6 w-6 text-holistic-purple" />,
      title: "Medicina China",
      description: "Explora la Medicina China y sus técnicas ancestrales para equilibrar el cuerpo y fortalecer tu salud integral."
    },
    {
      icon: <Moon className="h-6 w-6 text-holistic-purple" />,
      title: "Método Yuen",
      description: "Descubre el Método Yuen para liberar bloqueos energéticos y restaurar el equilibrio físico, mental y emocional."
    },
    {
      icon: <Ear className="h-6 w-6 text-holistic-purple" />,
      title: "Auriculoterapia",
      description: "Aprende Auriculoterapia para estimular puntos clave en la oreja y mejorar tu bienestar de manera natural."
    },
    {
      icon: <Star className="h-6 w-6 text-holistic-purple" />,
      title: "Cirugía Astral",
      description: "Explora la Cirugía Astral para limpiar energías densas, sanar bloqueos y elevar tu vibración espiritual."
    },
    {
      icon: <Eye className="h-6 w-6 text-holistic-purple" />,
      title: "Parapsicologia",
      description: "Descubrí la Parapsicología para activar tu intuición, expandir tu mente y potenciar tu energía."
    }
  ];

  return (
    <section className="py-16 bg-holistic-beige">
      <div className="holistic-container">
        <div className="text-center mb-12">
          <h2 className="holistic-heading text-3xl md:text-4xl font-bold mb-4">Nuestros Cursos</h2>
          <p className="text-lg text-holistic-dark/80 max-w-2xl mx-auto">
            Ofrecemos una variedad de cursos holísticos para nutrir tu cuerpo,
            mente y espíritu. Cada uno está diseñado para promover la sanación y el bienestar integral.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
