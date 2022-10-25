import app from './app'
import { PORT } from './envirinment'

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
