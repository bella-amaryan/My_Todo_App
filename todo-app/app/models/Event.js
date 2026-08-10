import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:String,
            date:{
                type:Date,
                required:true,

            },
             userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
        },
        {
        timestamps:true,
        }
)

export default mongoose.models.Event ||
 mongoose.model("Event",EventSchema)