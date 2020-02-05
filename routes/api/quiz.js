const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const pool = require("../../config/pool").pool;
const Roles = require("../../config/roles");
const Actions = require("../../config/messages").Actions;
const Errors = require("../../config/messages").Errors;
const Success = require("../../config/messages").Success;
const databaseUtility = require("../../utility/databaseUtility");

router.get("/", async (req, res) => {
  res.json("Testing the quiz");
});

addQuizQuestion = async ({ question, timeout, option, correctans }) => {
  const connection = await pool.getConnection();
  let statement = "INSERT INTO quiz (question , timeout) VALUES (?,?)";
  try {
    await connection.beginTransaction();
    let { isRecorded } = await connection
      .execute(statement, [question, timeout])
      .then(result => {
        return { isRecorded: true };
      })
      .catch(err => {
        return { isRecorded: false };
      });
    if (!isRecorded) {
      throw "Failed to Record";
    }
    let id;
    let getId = `SELECT id FROM quiz ORDER BY "id" DESC LIMIT 1`;
    connection
      .execute(getId)
      .then(result => {
        id = result[0];
      })
      .catch(err => {
        console.log("error while getting the id");
      });
    let recordAnswer = "INSERT INTO answer (answer, quiz_id) VALUES (?,?)";
    for (let ans of option) {
      let { answer } = ans;
      let { isAdded } = await connection
        .execute(recordAnswer, [answer, id])
        .then(result => {
          return { isAdded: true };
        })
        .catch(err => {
          return { isAdded: false };
        });
        if (!isAdded) {
          throw "Failed to add answer";
        }
    }
    await connection.commit();
    return { isRecorded, orderId };
  } catch (e) {
    await connection.rollback();
    return { isRecorded: false };
  } finally {
    connection.release();
  }
};

//@Route POST api/quiz/
//record the Quiz Question

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { question, timeout, option, correctans, ip } = req.body;
    const { email } = req.user;
    // let {errors,isValid} = await validateQuizQuestion(req.body);
    let isValid = true;
    if (!isValid) {
      return res.status(400).json({ errors: errors });
    }

    let { isRecorded } = await addQuizQuestion({
      question,
      timeout,
      option,
      correctans
    });
    if (isRecorded) {
      res.json({ type: "success", message: Errors.ADD_QUIZ_QUESTION });
      databaseUtility.logAtomic(email, Action.ADD_QUIZ_QUESTION, ip);
    } else {
      res.json({ type: "error", message: Errors.ADD_QUIZ_QUESTION_FAILED });
      databaseUtility.logAtomic(email, Action.ADD_QUIZ_QUESTION_FAILED, ip);
    }
  }
);

module.exports = router;
