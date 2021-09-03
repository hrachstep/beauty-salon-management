import { createApp } from './config/app';

const app = createApp();
app.listen(process.env.PORT, () => console.log(`Running at ${process.env.PORT}`));
