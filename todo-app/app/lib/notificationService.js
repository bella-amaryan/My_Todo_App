import Notification from "../models/Notification";
import User from "../models/User";

class NotificationService{
    static async create(userId,notification){
        const user = await User.findById(userId);
        if(!user)return null;
         const settings = user.notifications;
         if(!settings?.enabled)return null;
         switch(notification.type){
            
            case"DAILY_REMINDER":
            if(!settings.dailyReminder)return null;
            break;

            case"TASK_DUE":
            if(!settings.dueToday)return null;
            break;
           
            case"TASK_OVERDUE":
            if(!settings.overdueTasks)return null;
            break;
            
            case"WEEKLY_SUMMARY":
            if(!settings.weeklySummary)return null;
            break;
            
            default:
                break;
         }

        let exists; 

if (notification.type === "WEEKLY_SUMMARY") {

    const startOfWeek = new Date();

    startOfWeek.setDate(
        startOfWeek.getDate() - startOfWeek.getDay()
    );

    startOfWeek.setHours(0,0,0,0);


    exists = await Notification.findOne({

        userId,

        type: "WEEKLY_SUMMARY",

        createdAt:{
            $gte:startOfWeek
        }

    });


} else if(notification.todoId){

    exists = await Notification.findOne({

        userId,

        todoId: notification.todoId,

        type: notification.type,

        isRead:false

    });


} else {

    exists = await Notification.findOne({

        userId,

        type: notification.type,

        isRead:false

    });

}
         if(exists){
            return exists
        };

         return await Notification.create({
            userId,
            ...notification,
            isRead:false,
         })
    }

 static async daily(userId){
    return this.create(userId,
        {title:"Daily Reminder",
            message:"Check today's tasks",
            type: "DAILY_REMINDER",
        })
    
 }

 static async due(userId,todo){
    return this.create(userId,{
        title:"Task Due",
        message:`"${todo.title}" is due today`,
        type:"TASK_DUE",
        todoId:todo._id,

 })
 }

 static async overdue(userId, todo){
    return this.create(userId,{
        title:"Task Overdue",
        message:`"${todo.title}" is overdue`,
        type:"TASK_OVERDUE",
        todoId:todo._id,

    })
 }

 static async weekly(userId, message){
    return this.create(userId,{
        title:"Weekly Summary",
        message,
        type:"WEEKLY_SUMMARY",


    })
}
}

export default NotificationService;