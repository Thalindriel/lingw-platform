export const TEACHERS = [
  "Евгения Смирнова",
  "Анатолий Петров",
  "Екатерина Кузнецова",
  "Виктория Смит",
];

export function getRandomTeacher() {
  if (TEACHERS.length === 0) return "Преподаватель";
  return TEACHERS[Math.floor(Math.random() * TEACHERS.length)];
}
