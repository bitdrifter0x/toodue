import Task from '../models/taskModel.js'

export const createTask = async (req, res) => {

    try {
        const userId = req.user.id;
        const { title } = req.body;

        const newTask = await Task.create({
            title: title,
            userId: userId,

        })

        res.status(201).json({ message: 'Task created successfully', task: newTask })
    }

    catch (error){
        return res.status(500).json({ message: 'Server error', error })
    }
    
}



export const getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const getallTasks = await Task.find({
            userId: userId
        })

        res.status(200).json({ message: 'Tasks fetched', tasks: getallTasks })
    }

    catch (error){
        return res.status(500).json({ message: 'Server error', error })
    }
}


export const updateTask = async (req, res) => {

    try {
        const taskId = req.params.id;
        const updateTask = await Task.findByIdAndUpdate(taskId, { isCompleted: req.body.isCompleted }, { new: true })

        res.status(200).json({ message: 'Task updated successfully', task: updateTask })
    }

    catch (error){
        return res.status(500).json({ message: 'Server error', error })
    }
}


export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        // Check if the task exists in the database
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        // Handle invalid ObjectId errors
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid task ID format' });
        }
        
        return res.status(500).json({ message: 'Server error', error });
    }
};



 
