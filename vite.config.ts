import { readdirSync } from 'fs'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const topLevelDirs = readdirSync(__dirname, { withFileTypes: true }).reduce(
  (acc: Record<string, string>, file) => {
    if (file.isDirectory() && file.name !== 'node_modules') {
      acc[file.name] = resolve(__dirname, file.name)
    }
    return acc
  },
  {}
)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: topLevelDirs,
  },
})
