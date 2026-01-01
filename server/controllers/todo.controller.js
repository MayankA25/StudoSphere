import { Todo } from "../models/ToDo.js";
import { createCalenderInvite } from "../utils/googleCalendar.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      $or: [
        { userId: req.session.passport.user.user._id },
        { sharedTo: { $all: [req.session.passport.user.user.email] } },
      ],
    });
    const reverseTodo = todos.reverse();
    return res.status(200).json({ todos: reverseTodo });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Error While Getting Notes" });
  }
};

export const addTodo = async (req, res) => {
  console.log(req.body);
  const { title, description, tags, startDate, deadline } = req.body;
  // if (deadline <= date1 || deadline <= startDate || startDate < date1)
  //   return res.status(500).json({ msg: "Deadline Must Be Valid" });
  try {
    const newNote = await Todo.create({
      userId: req.session.passport.user.user._id,
      title,
      description,
      tags,
      startDate,
      deadline,
    });
    const savedNote = await newNote.save();
    return res.status(200).json({ savedNote });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Error While Adding ToDo" });
  }
};

export const editTodo = async (req, res) => {
  const { id, title, description, tags, startDate, deadline } = req.body;
  try {
    const editedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          tags,
          startDate,
          deadline,
        },
      },
      { new: true }
    );

    return res.status(200).json({ editedTodo });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Error While Editing Todo" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.query;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Todo Deleted Successfully" });
  } catch (e) {
    console.log(e);
    return res.status(200).json({ msg: "Error While Deleting Todo" });
  }
};

export const markAsCompleted = async (req, res) => {
  const { id } = req.body;
  try {
    const completedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: { completed: true } },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "ToDo Marked As Completed", completedTodo });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ msg: "Error While Marking ToDo as Completed" });
  }
};
export const markAsUncompleted = async (req, res) => {
  const { id } = req.body;
  try {
    const completedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: { completed: false } },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "ToDo Marked As Completed", completedTodo });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ msg: "Error While Marking ToDo as Completed" });
  }
};

export const shareTodo = async (req, res) => {
  const { id, sharedTo } = req.body;
  console.log(req.body);
  try {
    const foundTodo = await Todo.findById(id);
    console.log(foundTodo);

    const sharedToArray = foundTodo.sharedTo;

    const filteredSharedTo = sharedTo.filter((elem, index) => {
      return !sharedToArray.includes(elem) && elem !== "";
    });

    console.log(filteredSharedTo);
    if (filteredSharedTo.length == 0)
      return res.status(400).json({ msg: "Cannot Share ToDo" });

    // const currentUser = req.session.passport.user.user.email;

    if (foundTodo.sharedBy == sharedTo) {
      return res.status(400).json({ msg: "Cannot Share Back To The Assigner" });
    }

    // if(foundTodo.sharedBy!=="" && foundTodo.sharedBy !== currentUser){
    //   const forwardedTodo =  await Todo.findByIdAndUpdate(id, { $set: { forwardedBy: req.session.passport.user.user.email }, $push: { forwardTo: { $each: filteredSharedTo } } });
    //   return res.status(200).json({ forwardedTodo })

    // }
    const recipients = sharedTo.map((element, index) => {
      return { email: element };
    });
    await createCalenderInvite(
      {
        accessToken: req.session.passport.user.accessToken,
        refreshToken: req.session.passport.user.refreshTokem,
      },
      recipients,
      foundTodo
    );
    const sharedTodo = await Todo.findByIdAndUpdate(id, {
      $set: { sharedBy: req.session.passport.user.user.email },
      $push: { sharedTo: { $each: filteredSharedTo } },
    });
    return res.status(200).json({ sharedTodo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error While Sharing Todo" });
  }
};

export const addToCalendar = async(req, res)=>{
  try{
    const {id} = req.body;
    const foundTodo = await Todo.findById(id);

    if(!foundTodo) return res.status(400).json({ msg: "Cannot Find Todo To Share" });

    await createCalenderInvite(
      {
        accessToken: req.session.passport.user.accessToken,
        refreshToken: req.session.passport.user.refreshToken
      },
      [{email: req.session.passport.user.user.email}],
      foundTodo
    )

    return res.status(200).json({ msg: "Successfully Added To Your Google Calendar" });

  }catch(e){
    console.log(e);
    return res.status(500).json({ msg: "Error While Adding Todo In Google Calendar" })
  }
}
