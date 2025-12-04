import { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1890FF', // Azul Megamedia
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    borderRadius: 2, // Bordes más rectos para estilo "Swiss"
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      bodyBg: '#f0f2f5',
    },
    Card: {
      borderRadius: 2,
    },
    Button: {
      borderRadius: 2,
    }
  },
};
