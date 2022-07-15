import Datastore from "nedb-promises";

export const users = Datastore.create("data/users.db");
export const todos = Datastore.create("data/todos.db");

export const userLookup = async (userId: string) => {
  return users.findOne({ _id: userId });
};
