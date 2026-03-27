import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  // Prevent multiple React instances in the dev bundle (fixes "Invalid hook call").
  resolve: {
    dedupe: ['react', 'react-dom']
  },
})
