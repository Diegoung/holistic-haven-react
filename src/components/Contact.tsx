import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { Send, Mail, User, MessageSquare, Sparkles, HeartHandshake } from 'lucide-react';

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

      const result = await emailjs.sendForm(
        'default_service',   // Service ID
        'template_3q72zol', // Template ID
        form.current,       // Form reference
        'aMWCtUQZtlShW2nBN' // Public API Key
      );

      toast({
        title: "✨ Mensaje enviado",
        description: "Tu consulta ha sido enviada correctamente. Te responderemos a la brevedad.",
      });

      form.current.reset();
    } catch (error) {
      console.error('Error completo:', error);
      toast({
        title: "Error al enviar",
        description: "No se pudo enviar tu mensaje. Por favor, inténtalo de nuevo o contáctanos por WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-to-b from-purple-50/50 via-amber-50/30 to-purple-100/40 relative overflow-hidden">
      
      {/* Detalle decorativo de fondo */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold mb-4 shadow-sm border border-purple-200">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Estamos para acompañarte</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-purple-900 tracking-tight mb-4 font-serif">
            Contáctanos
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Escribinos tu consulta y nos pondremos en contacto con vos a la brevedad para ayudarte en tu camino de sanación y aprendizaje.
          </p>
        </div>

        {/* Tarjeta de Formulario con Magia */}
        <div className="max-w-2xl mx-auto">
          <Card className="rounded-3xl border border-purple-100/80 bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div className="space-y-2">
                    <label htmlFor="from_name" className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-purple-600" />
                      Nombre
                    </label>
                    <Input
                      id="from_name"
                      name="from_name"
                      placeholder="Tu nombre completo"
                      className="rounded-xl border-purple-100 bg-white/90 focus:border-purple-500 focus:ring-purple-400 text-sm py-3 px-4 shadow-sm transition-all"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="from_email" className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-purple-600" />
                      Email
                    </label>
                    <Input
                      id="from_email"
                      name="from_email"
                      type="email"
                      placeholder="tu@email.com"
                      className="rounded-xl border-purple-100 bg-white/90 focus:border-purple-500 focus:ring-purple-400 text-sm py-3 px-4 shadow-sm transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Escribí tu consulta aquí..."
                    className="min-h-[140px] rounded-2xl border-purple-100 bg-white/90 focus:border-purple-500 focus:ring-purple-400 text-sm p-4 shadow-sm transition-all resize-none"
                    required
                  />
                </div>

                {/* Botón de Enviar */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando consulta...
                    </span>
                  ) : (
                    <>
                      <span>Enviar Mensaje</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1 pt-2">
                  <HeartHandshake className="w-4 h-4 text-purple-400" />
                  <span>Tus datos están protegidos. Te responderemos en breve.</span>
                </p>

              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default Contact;