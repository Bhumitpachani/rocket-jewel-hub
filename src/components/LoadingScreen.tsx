import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <motion.img
          src={logo}
          alt="Rocket Diamond"
          className="w-24 h-24 mx-auto mb-6"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-2xl font-bold text-gradient mb-2">
            Rocket Diamond
          </h2>
          <p className="text-muted-foreground">Loading your experience...</p>
        </motion.div>
        
        <motion.div 
          className="mt-6 w-48 h-1 bg-secondary rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
