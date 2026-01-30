import { motion } from 'framer-motion';
import { Diamond, Users, Globe, Shield, Award, Target } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { value: '500+', label: 'Partner Jewelers' },
    { value: '$2.8M', label: 'Monthly Volume' },
    { value: '50k+', label: 'Diamonds Sold' },
    { value: '99.9%', label: 'Satisfaction Rate' }
  ];

  const values = [
    {
      icon: Diamond,
      title: 'Quality First',
      description: 'Every diamond we source meets the highest GIA certification standards.'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Complete documentation and fair pricing for every transaction.'
    },
    {
      icon: Users,
      title: 'Partner Success',
      description: 'Your growth is our priority. We succeed when you succeed.'
    },
    {
      icon: Globe,
      title: 'Global Sourcing',
      description: 'Access to premium stones from the world\'s finest mines.'
    }
  ];

  const team = [
    {
      name: 'Alexander Stone',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Victoria Diamond',
      role: 'Head of Sourcing',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Marcus Chen',
      role: 'Director of Partnerships',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-24 diamond-pattern relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-secondary rounded-full text-sm font-medium text-muted-foreground mb-6">
              About Rocket Diamond
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Elevating</span> the Diamond Industry
            </h1>
            <p className="text-xl text-muted-foreground">
              Since 2020, we've been connecting jewelers with the world's finest diamonds 
              through our innovative B2B platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Rocket Diamond was founded with a simple vision: to democratize access to 
                  premium diamonds for jewelers of all sizes. We saw an industry dominated 
                  by opaque pricing and exclusive relationships, and knew there had to be a 
                  better way.
                </p>
                <p>
                  Today, we're proud to serve over 500 jewelry partners across North America, 
                  providing them with GIA-certified stones at competitive wholesale prices. 
                  Our digital-first approach means real-time inventory access, transparent 
                  pricing, and seamless ordering.
                </p>
                <p>
                  As we continue to grow, our commitment remains unchanged: exceptional 
                  quality, fair pricing, and unwavering support for our partners' success.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop" 
                  alt="Diamond craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-2xl flex items-center justify-center glow-diamond">
                <Award className="w-12 h-12 text-primary" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide every decision we make and every relationship we build.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl"
              >
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4">Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the experts driving Rocket Diamond's mission forward.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-secondary">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
