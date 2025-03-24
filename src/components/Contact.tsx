import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';;

const Contact: React.FC = () => {
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!form.current) {
        throw new Error("Form reference not found");
      }

      const formData = new FormData(form.current);
      console.log("Datos enviados:", Object.fromEntries(formData.entries()));

      const result = await emailjs.sendForm(
        'default_service',   // Service ID
        'template_3q72zol', // Template ID
        form.current,       // Form reference
        'aMWCtUQZtlShW2nBN' // Public API Key
      );

      console.log('EmailJS response:', result);

      toast({
        title: "Mensaje enviado",
        description: "Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.",
      });

      form.current.reset();
    } catch (error) {
      console.error('Error completo:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="from_name" className="block text-sm font-medium text-holistic-dark">
                      Nombre
                    </label>
                    <Input
                      id="from_name"
                      name="from_name"  // Coincide con {{from_name}} en EmailJS
                      placeholder="Tu nombre completo"
                      className="bg-white border-holistic-lavender focus:border-holistic-purple"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="from_email" className="block text-sm font-medium text-holistic-dark">
                      Email
                    </label>
                    <Input
                      id="from_email"
                      name="from_email"  // Coincide con {{from_email}} en EmailJS
                      type="email"
                      placeholder="tu@email.com"
                      className="bg-white border-holistic-lavender focus:border-holistic-purple"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-holistic-dark">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"  // Coincide con {{message}} en EmailJS
                    placeholder="Escribe tu mensaje aquí..."
                    className="min-h-[150px] bg-white border-holistic-lavender focus:border-holistic-purple"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="holistic-btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
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
