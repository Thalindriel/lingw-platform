-- Создание таблицы курсов
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  color TEXT NOT NULL DEFAULT '#4aacbd',
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы модулей курсов
CREATE TABLE IF NOT EXISTS course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы уроков
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  order_number INTEGER NOT NULL,
  duration INTEGER, -- в минутах
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы запросов на курсы
CREATE TABLE IF NOT EXISTS course_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'new', -- new, contacted, enrolled, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Вставка демо-данных
INSERT INTO courses (title, description, price, color, slug) VALUES
('Английский с нуля', 'Освойте навыки по английскому для любых жизненных ситуаций с нашим комплексным курсом для начинающих', 5000, '#4aacbd', 'beginner'),
('Английский для бизнеса', 'Этот курс разработан для тех, кто хочет уверенно использовать английский язык в деловом общении', 8000, '#6d2e46', 'business'),
('Английский для общения', 'Курс разработан специально для тех, кто хочет научиться свободно общаться на английском языке', 6000, '#2a6d5d', 'conversation'),
('Подготовка к TOEFL и IELTS', 'Курс подготовки к международным экзаменам для студентов и профессионалов', 10000, '#8d5d2e', 'exams');

-- Создание модулей для курса "Английский с нуля"
DO $$
DECLARE
  beginner_id UUID;
BEGIN
  SELECT id INTO beginner_id FROM courses WHERE slug = 'beginner';
  
  INSERT INTO course_modules (course_id, title, description, order_number) VALUES
  (beginner_id, 'Основное произношение', 'Изучение базовых звуков английского языка', 1),
  (beginner_id, 'Базовая грамматика', 'Основы грамматики английского языка', 2),
  (beginner_id, 'Простые диалоги', 'Практика простых диалогов на английском', 3),
  (beginner_id, 'Повседневные разговоры', 'Разговорные темы для повседневного общения', 4);
END $$;

-- Создание модулей для курса "Английский для бизнеса"
DO $$
DECLARE
  business_id UUID;
BEGIN
  SELECT id INTO business_id FROM courses WHERE slug = 'business';
  
  INSERT INTO course_modules (course_id, title, description, order_number) VALUES
  (business_id, 'Основы делового английского', 'Деловой этикет, формальная и неформальная лексика', 1),
  (business_id, 'Вербальное деловое общение', 'Ведение переговоров, участие в совещаниях', 2),
  (business_id, 'Переговоры и деловой этикет', 'Стратегии ведения переговоров, аргументация', 3),
  (business_id, 'Английский для профессиональной среды', 'Специализированная лексика для различных отраслей', 4);
END $$;

