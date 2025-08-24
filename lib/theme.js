export const theme = {
  colors: {
    primary: '#FF6B35', // Warm Orange
    secondary: '#FF8E53', // Light Orange
    accent: '#FF4500', // Deep Orange
    background: '#FFFFFF', // White background
    surface: '#F8F9FA', // Light gray surface
    card: '#FFFFFF', // White cards
    text: '#2D3748', // Dark gray text
    textSecondary: '#718096', // Medium gray
    success: '#48BB78',
    warning: '#ED8936',
    error: '#F56565',
    border: '#E2E8F0',
    gradient: {
      primary: ['#FF6B35', '#FF8E53'],
      secondary: ['#FF8E53', '#FFB366'],
      accent: ['#FF4500', '#FF6B35'],
      light: ['#FFF5F0', '#FFFFFF'],
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
    },
    body1: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};
