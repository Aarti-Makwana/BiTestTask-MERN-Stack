import mongoose from 'mongoose';
// mongoose.connect("mongodb+srv://ritikbhondve:gyJRak8IdzncTEcb@cluster0.2hpsp2x.mongodb.net/BrainInventory_db");  
mongoose.connect('mongodb://localhost:27017/BrainInventory_db');
export default mongoose;
