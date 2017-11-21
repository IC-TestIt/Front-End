import questionService from '../services/questionService'

export default {
  addQuestion: function (questions, currentQuestion) {
    let length = questions.length
    questions.push({
      description: '',
      value: '',
      testId: this.testId,
      order: '',
      keywords: [],
      answer: '',
      isAlternative: false,
      alternatives: [{description: '', isCorrect: false}]
    })
    questionService.saveQuestions(questions)
    currentQuestion = questions[length]
    questions = questionService.getQuestions()
  },
  removeQuestion: function (questions, currentQuestion, index) {
    index -= 1
    let length = questions.length
    if (length >= 1) {
      questions.splice(index, 1)
      questionService.saveQuestions(questions)
    }
    length = questions.length
    if (length === 0) {
      questions.push({
        description: '',
        value: '',
        testId: this.testId,
        order: '',
        keywords: [],
        answer: '',
        isAlternative: false,
        alternatives: [{description: '', isCorrect: false}]
      })
      currentQuestion = questions[0]
    } else {
      currentQuestion = questions[index + 1]
    }
    questions = questionService.getQuestions()
  },
  lastQuestion: function (questions, index) {
    let length = questions.length
    return length === index
  },
  addAlternative: function (question) {
    let length = question.alternatives.length
    if (length < 5) {
      question.alternatives.push({
        description: '',
        isCorrect: false
      })
    }
  },
  lastAlternative: function (question, index) {
    let length = question.alternatives.length
    return length === (index + 1)
  },
  removeAlternative: function (question, index) {
    let length = question.alternatives.length
    if (length > 1) {
      question.alternatives.splice(index, 1)
    } else if (length === 1) {
      question.alternatives = [{
        description: '',
        isCorrect: false
      }]
    }
  },
  alternativeLimit: function (question) {
    let length = question.alternatives.length
    return length < 5
  }
}
