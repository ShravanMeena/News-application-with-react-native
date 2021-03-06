import asyncHandler from "express-async-handler";

const getTestData = asyncHandler(async (req, res) => {
  const Test = {
    message: "Working",
    next: "Work Continuosly!!!",
  };
  if (Test) {
    res.json(Test);
  } else {
    res.status(404);
    throw new Error("not working");
  }
});

export { getTestData };
