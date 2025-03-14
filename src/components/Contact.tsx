
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Configura aquí tus IDs de EmailJS
      const serviceId = 'default_service'; // Deberás crear un servicio en EmailJS
      const templateId = 'template_id'; // Deberás crear una plantilla en EmailJS
      const userId = 'user_id'; // Tu User ID de EmailJS
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      };

      await emailjs.send(serviceId, templateId, templateParams, userId);
      
      toast({
        title: "Mensaje enviado",
        description: "Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.",
      });
      
      // Limpiar el formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
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
                      value={formData.name}
                      onChange={handleChange}
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
                      value={formData.email}
                      onChange={handleChange}
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
                    value={formData.subject}
                    onChange={handleChange}
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
                    value={formData.message}
                    onChange={handleChange}
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

