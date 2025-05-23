"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialProps {
  content: string;
  name: string;
  role: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialProps> = React.memo(
  ({ content, name, role, avatar }) => {
    return (
      <Card className="holistic-card">
        <CardContent className="pt-6">
          <div className="mb-4">
            <svg
              className="h-8 w-8 text-holistic-purple opacity-50"
              fill="currentColor"
              viewBox="0 0 32 32"
              role="img"
              aria-label="Icono de testimonio"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </div>
          <p className="text-holistic-dark/90 italic">{content}</p>
        </CardContent>
        <CardFooter className="border-t border-holistic-mint pt-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={avatar} alt={`Avatar de ${name}`} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-holistic-dark">{name}</p>
              <p className="text-sm text-holistic-dark/70">{role}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

TestimonialCard.displayName = "TestimonialCard";

const Testimonials: React.FC = () => {
  const testimonials: TestimonialProps[] = [
    {
      content:
        "Gracias a la Reflexología, he logrado aliviar tensiones y mejorar mi bienestar general. Siento una profunda relajación y un equilibrio energético renovado.",
      name: "María García",
      role: "Profesora",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      content:
        "El curso de Biomagnetismo me ha permitido conocer una técnica increíble para restaurar la salud y equilibrar el cuerpo de manera natural. ¡Una experiencia transformadora!",
      name: "Carlos Rodríguez",
      role: "Ingeniero",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      content:
        "La Activación de la Glándula Pineal ha expandido mi percepción y claridad mental. Me siento más conectado con mi intuición y con una energía renovada.",
      name: "Laura Martínez",
      role: "Diseñadora",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ];

  return (
    <section id="testimonios" className="py-16 bg-holistic-light">
      <div className="holistic-container">
        <div className="text-center mb-12">
          <h2 className="holistic-heading text-3xl md:text-4xl font-bold mb-4">
            Lo que dicen nuestros Alumnos
          </h2>
          <p className="text-lg text-holistic-dark/80 max-w-2xl mx-auto">
            Descubre cómo nuestros cursos holísticos han transformado la vida
            de quienes han confiado en nosotros.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;