import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config ={
  mode:'development',
  entry:'./src/script.js',
  output:{
    filename:'output.js',
    path:path.resolve(__dirname,'dist'),
  }
}
export default config