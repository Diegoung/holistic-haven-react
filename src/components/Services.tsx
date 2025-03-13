
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
          Nuestras terapias están diseñadas para brindar bienestar completo y aliviar
          malestares físicos y emocionales.
        </p>
      </CardContent>
    </Card>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <Flower className="h-6 w-6 text-holistic-purple" />,
      title: "Terapias Naturales",
      description: "Tratamientos basados en elementos naturales para restaurar el equilibrio."
    },
    {
      icon: <Heart className="h-6 w-6 text-holistic-purple" />,
      title: "Meditación Guiada",
      description: "Sesiones para calmar la mente y conectar con tu esencia interior."
    },
    {
      icon: <Sun className="h-6 w-6 text-holistic-purple" />,
      title: "Yoga Terapéutico",
      description: "Posturas y respiración para fortalecer cuerpo y espíritu."
    },
    {
      icon: <Moon className="h-6 w-6 text-holistic-purple" />,
      title: "Aromaterapia",
      description: "Esencias naturales para equilibrar emociones y energía vital."
    },
    {
      icon: <FlowerIcon className="h-6 w-6 text-holistic-purple" />,
      title: "Masaje Holístico",
      description: "Técnicas ancestrales para liberar tensiones y bloqueos energéticos."
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-holistic-purple" />,
      title: "Nutrición Consciente",
      description: "Alimentación enfocada en nutrir cuerpo, mente y espíritu."
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
