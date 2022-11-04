import app from './app';
import { PORT } from './utilities/envirinment.utility';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
