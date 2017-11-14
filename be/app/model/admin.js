module.exports = app => {
  const { mongoose } = app;
  const AdminSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    status: { type: Boolean },

  });

  return mongoose.model('Admin', AdminSchema);
};
