const createJob = async (req, res) => {
  res.send("Create Job");
};

const deleteJob = async (req, res) => {
  res.send("delete Job");
};

const getAllJobs = async (req, res) => {
  res.send("get Job");
};

const updateJob = async (req, res) => {
  res.send("update Job");
};

const showStats = async (req, res) => {
  res.send("stats Job");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
