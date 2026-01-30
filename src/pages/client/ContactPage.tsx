import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', company: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'contact@rocketdiamond.com',
      subtext: 'We respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+1 (555) 123-4567',
      subtext: 'Mon-Fri 9am-6pm EST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Diamond District, NYC',
      subtext: 'By appointment only'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Mon - Fri: 9am - 6pm',
      subtext: 'EST Timezone'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 diamond-pattern relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="font-display text-5xl font-bold mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to partner with us? Have questions about our products? 
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-3xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      required
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Jewelry Store"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Message *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your business and how we can help..."
                    rows={5}
                    required
                    className="bg-secondary border-border"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full sm:w-auto shimmer"
                >
                  Send Message
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-display text-3xl font-bold mb-6">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 rounded-2xl"
                  >
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{info.title}</h3>
                    <p className="text-foreground font-medium">{info.value}</p>
                    <p className="text-sm text-muted-foreground">{info.subtext}</p>
                  </motion.div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 aspect-video rounded-2xl overflow-hidden bg-secondary flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Diamond District, NYC</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
