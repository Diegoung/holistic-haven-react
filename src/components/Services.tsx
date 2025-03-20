
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flower, Heart, Sun, Moon, FlowerIcon, HeartPulse } from 'lucide-react';

const ServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
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
        <p className="text-sm text-holistic-dark/80">
          
        </p>
      </CardContent>
    </Card>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <Flower className="h-6 w-6 text-holistic-purple" />,
      title: "Pack holistico 22 cursos",
      description: "Runas,Magia e interpretación con velas, Registros akashicos, Vidas pasadas kharma y Dharma, Limpieza energetica, Corte de cordones energéticos, Constestaciones familiares, Los Chakas y aura, Radiestesia, Hoponopono, Gemoterapia, Sanación con ángeles, Pendulo hebreo, Sanación árbol genealógico, Flores de Bach, Rocio auricos y sahumos, Sanación niño interior, Ayurveda, Sanación popular, Magia wicca, Biodescodificacion, Sanación linaje femenino y rito del útero."
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
      icon: <FlowerIcon className="h-6 w-6 text-holistic-purple" />,
      title: "Reflexologia",
      description: "Descubre la Reflexología para aliviar tensiones, mejorar tu bienestar y equilibrar tu energía a través de los pies."
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-holistic-purple" />,
      title: "Astrologia y Numerologia",
      description: "Explora Astrología y Numerología para comprender tu energía, descubrir tu propósito y armonizar tu vida."
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-holistic-purple" />,
      title: "Reiki",
      description: "Experimenta Reiki para equilibrar tu energía, reducir el estrés y promover sanación y bienestar integral."
    },

  ];

  return (
    <section className="py-16 bg-holistic-beige">
      <div className="holistic-container">
        <div className="text-center mb-12">
          <h2 className="holistic-heading text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-holistic-dark/80 max-w-2xl mx-auto">
            Ofrecemos una variedad de terapias y servicios holísticos para nutrir tu cuerpo,
            mente y espíritu. Cada servicio está diseñado para promover la sanación y el bienestar integral.
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
