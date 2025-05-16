export const TEACHERS = [
  "Евгения Смирнова",
  "Анатолий Петров",
  "Екатерина Кузнецова",
  "Виктория Смит",
];

export function getRandomTeacher() {
  return TEACHERS[Math.floor(Math.random() * TEACHERS.length)];
}
