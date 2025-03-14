
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado');
  };

  return (
    <section className="py-16 bg-holistic-mint">
      <div className="holistic-container">
        <div className="text-center mb-12">
          <h2 className="holistic-heading text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
          <p className="text-lg text-holistic-dark/80 max-w-2xl mx-auto">
            Estamos aquí para ayudarte en tu camino hacia el bienestar integral. Envíanos un mensaje
            y te responderemos a la brevedad.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="holistic-card">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-holistic-dark">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      className="bg-white border-holistic-lavender focus:border-holistic-purple"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-holistic-dark">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email"
                      className="bg-white border-holistic-lavender focus:border-holistic-purple"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-holistic-dark">
                    Asunto
                  </label>
                  <Input
                    id="subject"
                    placeholder="Asunto de tu mensaje"
                    className="bg-white border-holistic-lavender focus:border-holistic-purple"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-holistic-dark">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Escribe tu mensaje aquí..."
                    className="min-h-[150px] bg-white border-holistic-lavender focus:border-holistic-purple"
                    required
                  />
                </div>
                
                <Button type="submit" className="holistic-btn-primary w-full">
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
