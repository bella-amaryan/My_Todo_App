 import mongoose from "mongoose"
const GoalSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,
    },

goals:{
    type:String,
    default:"",
},
notes:{
    type:String,
    default:"",
},
},
{
timestamps:true,
}
)

export default mongoose.models.Goal ||
mongoose.model("Goal",GoalSchema)