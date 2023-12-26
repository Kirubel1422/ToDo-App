const model = require("../model/model");

const getHandler = async (req, res) => {
  try {
    const todos = await model.find({}).exec();
    res.json({ todos: todos });
  } catch (error) {
    console.error(error);
  }
};

const postHandler = async (req, res) => {
  const request = req.body;
  request["timeStamp"] = new Date().toISOString();
  try {
    await model.create(request);
    res.json({ msg: "Success" });
  } catch (error) {
    res.json({ msg: "Failed to post" });
    console.error(error);
  }
};

const putHandler = async (req, res) => {
  const userId = req.params.id;
  const { task, completed } = req.body;
  try {
    await model.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          task: task,
          completed: completed,
        },
      }
    );
    res.json({ msg: "Success" });
  } catch (error) {
    res.json({ msg: "Failed to update" });
    console.error(error);
  }
};

const deleteHandler = async (req, res) => {
  const userId = req.params.id;
  try {
    await model.findOneAndDelete({ _id: userId });
    res.json({ msg: "Successfully Deleted" });
  } catch (error) {
    res.json({ msg: "Deleting Failed" });
    console.error(error);
  }
};

module.exports = { getHandler, postHandler, putHandler, deleteHandler };
