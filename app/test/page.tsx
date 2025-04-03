"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ArrowRight, Clock, BookOpen } from "lucide-react"

// Типы вопросов
type QuestionType = "single" | "multiple" | "text" | "match"

// Интерфейс для вопроса
interface Question {
  id: number
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  matches?: { item: string; match: string }[]
  points: number
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
}

// Интерфейс для результатов по уровням
interface LevelResult {
  level: string
  score: number
  maxScore: number
  percentage: number
}

export default function TestPage() {
  const [isStarted, setIsStarted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<{
    totalScore: number
    maxScore: number
    percentage: number
    level: string
    levelResults: LevelResult[]
  } | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Состояние для вопроса с сопоставлением
  const [matchPairs, setMatchPairs] = useState<Record<string, string>>({})
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Вопросы для теста
  const questions: Question[] = [
    {
      id: 1,
      type: "single",
      question: 'Choose the correct option to complete the sentence: "She ___ to the store yesterday."',
      options: ["go", "goes", "went", "gone"],
      correctAnswer: "went",
      points: 1,
      level: "A1",
    },
    {
      id: 2,
      type: "single",
      question: "Which sentence is grammatically correct?",
      options: ["I no like coffee.", "I not like coffee.", "I don't like coffee.", "I doesn't like coffee."],
      correctAnswer: "I don't like coffee.",
      points: 1,
      level: "A1",
    },
    {
      id: 3,
      type: "single",
      question: 'Choose the correct option: "If I ___ rich, I would buy a big house."',
      options: ["am", "was", "were", "be"],
      correctAnswer: "were",
      points: 2,
      level: "B1",
    },
    {
      id: 4,
      type: "multiple",
      question: "Select all words that are countable nouns:",
      options: ["water", "book", "information", "apple", "furniture", "pen"],
      correctAnswer: ["book", "apple", "pen"],
      points: 2,
      level: "A2",
    },
    {
      id: 5,
      type: "single",
      question: 'Choose the correct option: "By the time we arrived, the movie ___."',
      options: ["already started", "has already started", "had already started", "was already starting"],
      correctAnswer: "had already started",
      points: 3,
      level: "B2",
    },
    {
      id: 6,
      type: "single",
      question: 'Which word is a synonym for "beautiful"?',
      options: ["ugly", "pretty", "bad", "good"],
      correctAnswer: "pretty",
      points: 1,
      level: "A1",
    },
    {
      id: 7,
      type: "match",
      question: "Match the words with their opposites:",
      matches: [
        { item: "hot", match: "cold" },
        { item: "big", match: "small" },
        { item: "fast", match: "slow" },
        { item: "happy", match: "sad" },
      ],
      points: 2,
      level: "A2",
    },
    {
      id: 8,
      type: "single",
      question: 'Choose the correct option: "She ___ in London for five years now."',
      options: ["lives", "is living", "has lived", "lived"],
      correctAnswer: "has lived",
      points: 2,
      level: "B1",
    },
    {
      id: 9,
      type: "single",
      question: "Which sentence uses the passive voice correctly?",
      options: [
        "The book was written by him.",
        "He written the book.",
        "The book written by him.",
        "He was written the book.",
      ],
      correctAnswer: "The book was written by him.",
      points: 2,
      level: "B1",
    },
    {
      id: 10,
      type: "single",
      question: 'Choose the correct option: "I wish I ___ how to swim."',
      options: ["know", "knows", "knew", "known"],
      correctAnswer: "knew",
      points: 3,
      level: "B2",
    },
    {
      id: 11,
      type: "multiple",
      question: "Select all correct modal verbs:",
      options: ["can", "must", "should", "would", "did", "does"],
      correctAnswer: ["can", "must", "should", "would"],
      points: 2,
      level: "A2",
    },
    {
      id: 12,
      type: "single",
      question: 'Choose the correct option: "Had I known about the problem, I ___ it earlier."',
      options: ["would fix", "would have fixed", "will fix", "had fixed"],
      correctAnswer: "would have fixed",
      points: 3,
      level: "C1",
    },
    {
      id: 13,
      type: "single",
      question: 'Which word is a synonym for "difficult"?',
      options: ["easy", "simple", "challenging", "basic"],
      correctAnswer: "challenging",
      points: 1,
      level: "A2",
    },
    {
      id: 14,
      type: "single",
      question: 'Choose the correct option: "Despite ___ very tired, she continued working."',
      options: ["be", "being", "she was", "she is"],
      correctAnswer: "being",
      points: 3,
      level: "B2",
    },
    {
      id: 15,
      type: "single",
      question: "Which sentence contains a gerund?",
      options: [
        "I want to go home.",
        "She likes swimming in the ocean.",
        "They will arrive tomorrow.",
        "He has a new car.",
      ],
      correctAnswer: "She likes swimming in the ocean.",
      points: 2,
      level: "B1",
    },
  ]

  // Начать тест
  const startTest = () => {
    setIsStarted(true)
    setCurrentQuestion(0)
    setAnswers({})
    setProgress(0)
    setMatchPairs({})
  }

  // Обработка ответа на вопрос с одним вариантом
  const handleSingleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer })
  }

  // Обработка ответа на вопрос с множественным выбором
  const handleMultipleAnswer = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option]

    setSelectedOptions(newSelectedOptions)
    setAnswers({ ...answers, [currentQuestion]: newSelectedOptions })
  }

  // Обработка клика по элементу в вопросе с сопоставлением
  const handleMatchItemClick = (item: string) => {
    setSelectedItem(item)
  }

  // Обработка клика по сопоставляемому элементу
  const handleMatchClick = (match: string) => {
    if (selectedItem) {
      // Создаем новый объект сопоставлений
      const newMatchPairs = { ...matchPairs, [selectedItem]: match }
      setMatchPairs(newMatchPairs)
      setSelectedItem(null)

      // Проверяем, все ли элементы сопоставлены
      const question = questions[currentQuestion]
      if (question.matches && Object.keys(newMatchPairs).length === question.matches.length) {
        // Сохраняем ответ
        setAnswers({ ...answers, [currentQuestion]: newMatchPairs })
      }
    }
  }

  // Проверка правильности сопоставлений
  const checkMatchAnswers = (
    userMatches: Record<string, string>,
    correctMatches: { item: string; match: string }[],
  ) => {
    let correctCount = 0

    correctMatches.forEach(({ item, match }) => {
      if (userMatches[item] === match) {
        correctCount++
      }
    })

    return correctCount / correctMatches.length
  }

  // Переход к следующему вопросу
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setProgress(((currentQuestion + 1) / questions.length) * 100)

      // Сбросить выбранные опции для следующего вопроса с множественным выбором
      if (questions[currentQuestion + 1].type === "multiple") {
        setSelectedOptions((answers[currentQuestion + 1] as string[]) || [])
      }

      // Сбросить выбранный элемент для сопоставления
      setSelectedItem(null)
    } else {
      // Завершение теста
      calculateResults()
      setIsFinished(true)
    }
  }

  // Переход к предыдущему вопросу
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setProgress(((currentQuestion - 1) / questions.length) * 100)

      // Восстановить выбранные опции для предыдущего вопроса с множественным выбором
      if (questions[currentQuestion - 1].type === "multiple") {
        setSelectedOptions((answers[currentQuestion - 1] as string[]) || [])
      }

      // Сбросить выбранный элемент для сопоставления
      setSelectedItem(null)
    }
  }

  // Расчет результатов теста
  const calculateResults = () => {
    let totalScore = 0
    let maxScore = 0

    // Подсчет баллов по уровням
    const levelScores: Record<string, { score: number; maxScore: number }> = {
      A1: { score: 0, maxScore: 0 },
      A2: { score: 0, maxScore: 0 },
      B1: { score: 0, maxScore: 0 },
      B2: { score: 0, maxScore: 0 },
      C1: { score: 0, maxScore: 0 },
      C2: { score: 0, maxScore: 0 },
    }

    questions.forEach((question, index) => {
      const userAnswer = answers[index]
      maxScore += question.points
      levelScores[question.level].maxScore += question.points

      if (userAnswer) {
        if (question.type === "single" && userAnswer === question.correctAnswer) {
          totalScore += question.points
          levelScores[question.level].score += question.points
        } else if (question.type === "multiple") {
          const correctAnswers = question.correctAnswer as string[]
          const userAnswers = userAnswer as string[]

          // Проверка, что все выбранные ответы правильные и выбраны все правильные ответы
          const allCorrect = userAnswers.every((answer) => correctAnswers.includes(answer))
          const allSelected = correctAnswers.every((answer) => userAnswers.includes(answer))

          if (allCorrect && allSelected) {
            totalScore += question.points
            levelScores[question.level].score += question.points
          } else if (allCorrect || allSelected) {
            // Частично правильный ответ
            totalScore += question.points / 2
            levelScores[question.level].score += question.points / 2
          }
        } else if (question.type === "match" && question.matches) {
          // Проверка сопоставлений
          const matchScore = checkMatchAnswers(userAnswer as Record<string, string>, question.matches)
          const pointsEarned = question.points * matchScore

          totalScore += pointsEarned
          levelScores[question.level].score += pointsEarned
        }
      }
    })

    // Определение уровня на основе процента правильных ответов по каждому уровню
    const levelResults: LevelResult[] = Object.entries(levelScores).map(([level, { score, maxScore }]) => ({
      level,
      score,
      maxScore,
      percentage: maxScore > 0 ? (score / maxScore) * 100 : 0,
    }))

    // Определение общего уровня
    let determinedLevel = "A1"

    if (levelResults.find((l) => l.level === "C1" && l.percentage >= 70)) {
      determinedLevel = "C1"
    } else if (levelResults.find((l) => l.level === "B2" && l.percentage >= 70)) {
      determinedLevel = "B2"
    } else if (levelResults.find((l) => l.level === "B1" && l.percentage >= 70)) {
      determinedLevel = "B1"
    } else if (levelResults.find((l) => l.level === "A2" && l.percentage >= 70)) {
      determinedLevel = "A2"
    }

    setResults({
      totalScore,
      maxScore,
      percentage: (totalScore / maxScore) * 100,
      level: determinedLevel,
      levelResults,
    })
  }

  // Рестарт теста
  const restartTest = () => {
    setIsStarted(false)
    setIsFinished(false)
    setCurrentQuestion(0)
    setAnswers({})
    setProgress(0)
    setResults(null)
    setMatchPairs({})
  }

  // Рендер текущего вопроса
  const renderQuestion = () => {
    const question = questions[currentQuestion]

    switch (question.type) {
      case "single":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-4">{question.question}</h3>
            <RadioGroup
              value={(answers[currentQuestion] as string) || ""}
              onValueChange={handleSingleAnswer}
              className="space-y-3"
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case "multiple":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-4">{question.question}</h3>
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`option-${index}`}
                    checked={selectedOptions.includes(option)}
                    onCheckedChange={() => handleMultipleAnswer(option)}
                  />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )

      case "match":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium mb-4">{question.question}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">Слова</h4>
                {question.matches?.map((match, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedItem === match.item
                        ? "bg-primary text-white"
                        : matchPairs[match.item]
                          ? "bg-green-100 border border-green-300"
                          : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleMatchItemClick(match.item)}
                  >
                    {match.item}
                    {matchPairs[match.item] && <span className="ml-2 text-green-600">→</span>}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Противоположности</h4>
                {question.matches?.map((match, index) => {
                  // Проверяем, выбран ли уже этот вариант
                  const isMatched = Object.values(matchPairs).includes(match.match)

                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        isMatched ? "bg-green-100 border border-green-300" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => handleMatchClick(match.match)}
                    >
                      {match.match}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Выберите слово слева, затем выберите его противоположность справа.
              </p>
            </div>
          </div>
        )

      default:
        return <div>Unsupported question type</div>
    }
  }

  // Рендер результатов теста
  const renderResults = () => {
    if (!results) return null

    const levelDescriptions: Record<string, { description: string; recommendation: string }> = {
      A1: {
        description:
          "Начальный уровень. Вы можете понимать и использовать знакомые повседневные выражения и очень простые фразы.",
        recommendation: 'Рекомендуем начать с курса "Английский с нуля" для построения прочного фундамента.',
      },
      A2: {
        description:
          "Элементарный уровень. Вы можете общаться в простых и рутинных ситуациях, требующих простого и прямого обмена информацией.",
        recommendation: 'Рекомендуем курс "Английский для начинающих" для развития базовых навыков.',
      },
      B1: {
        description:
          "Средний уровень. Вы можете понимать основные идеи четких сообщений, создавать простые связные тексты на знакомые темы.",
        recommendation: 'Рекомендуем курс "Разговорный английский" для улучшения коммуникативных навыков.',
      },
      B2: {
        description:
          "Выше среднего. Вы можете понимать сложные тексты, общаться достаточно спонтанно и бегло с носителями языка.",
        recommendation: 'Рекомендуем курс "Деловой английский" для совершенствования профессиональных навыков.',
      },
      C1: {
        description:
          "Продвинутый уровень. Вы можете понимать сложные и длинные тексты, выражаться спонтанно и бегло, не испытывая затруднений с подбором слов.",
        recommendation:
          'Рекомендуем курс "Подготовка к TOEFL/IELTS" для достижения международного уровня владения языком.',
      },
      C2: {
        description:
          "Владение в совершенстве. Вы можете понимать практически любое устное или письменное сообщение, составлять связные тексты, выражая тонкие оттенки значения.",
        recommendation: "Рекомендуем специализированные курсы для поддержания и совершенствования ваших навыков.",
      },
    }

    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Ваш результат</h2>
          <div className="text-4xl font-bold text-primary mb-2">{results.level}</div>
          <p className="text-gray-600 mb-4">{levelDescriptions[results.level].description}</p>
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl font-bold">{Math.round(results.percentage)}%</span>
            <span className="text-gray-500">
              ({results.totalScore} из {results.maxScore} баллов)
            </span>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Рекомендация</h3>
          <p className="mb-4">{levelDescriptions[results.level].recommendation}</p>
          <div className="flex justify-center">
            <Link href="/courses">
              <Button className="bg-primary hover:bg-primary/90">
                Посмотреть курсы
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Детальные результаты по уровням</h3>
          <div className="space-y-4">
            {results.levelResults.map((levelResult, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">{levelResult.level}</span>
                  <span className="text-gray-500">{Math.round(levelResult.percentage)}%</span>
                </div>
                <Progress value={levelResult.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={restartTest} variant="outline" className="mr-4">
            Пройти тест снова
          </Button>
          <Link href="/">
            <Button>На главную</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Проверка, можно ли перейти к следующему вопросу
  const canProceed = () => {
    const question = questions[currentQuestion]

    if (question.type === "match") {
      // Для вопроса с сопоставлением проверяем, все ли элементы сопоставлены
      return question.matches && Object.keys(matchPairs).length === question.matches.length
    }

    // Для других типов вопросов
    return !!answers[currentQuestion]
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-[#3a8dae] to-[#5b6da5] text-white">
        <div className="container mx-auto px-6 py-12">
          {!isStarted && !isFinished ? (
            <div className="max-w-3xl mx-auto">
              <div
                className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <h1 className="text-3xl font-bold mb-4">Определите свой уровень английского языка</h1>
                <p className="text-lg mb-8">
                  Пройдите тест и получите подробный анализ вашего уровня владения английским языком. На основе
                  результатов мы подберем для вас оптимальную программу обучения.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Время прохождения</h3>
                      <p>10-15 минут</p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Уровни сложности</h3>
                      <p>От A1 до C2</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white text-gray-800 rounded-lg p-8 mb-8 transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1">
                  <h2 className="text-2xl font-bold mb-4">
                    Сразу после прохождения вы узнаете свой результат и получите рекомендации о том, как повысить свой
                    уровень английского.
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Наш тест полностью бесплатный. Сразу после завершения тестирования вы получите информацию об уровне
                    своего языка и допущенных ошибках
                  </p>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    onClick={startTest}
                  >
                    Пройти тест
                  </Button>
                </div>
              </div>
            </div>
          ) : isFinished ? (
            <div className="max-w-3xl mx-auto bg-white text-gray-800 rounded-lg p-8">{renderResults()}</div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">
                    Вопрос {currentQuestion + 1} из {questions.length}
                  </span>
                  <span className="text-sm">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <Card className="bg-white text-gray-800 p-6 mb-6 animate-fade-in">{renderQuestion()}</Card>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Назад
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={!canProceed()}
                  className="bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {currentQuestion === questions.length - 1 ? "Завершить" : "Далее"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

