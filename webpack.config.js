import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config ={
  mode:'development',
  entry:'./src/models.js',
  output:{
    filename:'modelsw.js',
    path:path.resolve(__dirname,'src'),
  }
}
export default config