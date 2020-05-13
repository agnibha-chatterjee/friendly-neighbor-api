import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    console.log('Connected to DB');
};

export default connectDB;
