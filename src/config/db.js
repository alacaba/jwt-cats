const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

mongoose.connection.on('error', () => console.error('mongodb connection error'));
mongoose.connection.on('open', () => console.log('mongodb connection successful'));

