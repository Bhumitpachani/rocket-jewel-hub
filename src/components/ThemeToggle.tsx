import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleTheme } from '@/store/themeSlice';
import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const ThemeToggle = ({ variant = 'ghost', size = 'icon' }: ThemeToggleProps) => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => dispatch(toggleTheme())}
      className="relative overflow-hidden"
      aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: themeMode === 'dark' ? 0 : 180,
          scale: themeMode === 'dark' ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="h-5 w-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          rotate: themeMode === 'light' ? 0 : -180,
          scale: themeMode === 'light' ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="h-5 w-5" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
