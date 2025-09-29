
LilyaSite — UGS Creator & Videomaker (Vue 3 + Vite)

Этот репозиторий — минимальная реализация сайта по образцу https://www.lilyacreates.com/:
- Hero секция
- Описание / Bio
- Услуги (Services)
- Портфолио
- Контактная форма (локально сохраняет сообщения в localStorage, демо)

Быстрый старт:

1. Установить зависимости

```bash
npm install
```

2. Запустить dev сервер

```bash
npm run dev
```

По умолчанию Vite запустится на http://localhost:5173/ — откройте в браузере.

3. Собрать production-бандл

```bash
npm run build
```

4. Просмотреть собранный бандл локально

```bash
npm run preview
```

Дальше: можно доработать стили, подключить реальные медиа в `src/assets`, добавить форму с бэкендом или интеграцию с Email/Forms сервисом.

Логотип в хедере:
- Поместите присланное изображение логотипа в корень публичных файлов: `public/logo.png`.
- Хедер автоматически подхватит `/logo.png` и окрасится в тёмно-коричневый тон, близкий к исходному лого.

## Деплой на Netlify

Файл `netlify.toml` уже добавлен и включает:
- build command: `npm run build`
- publish dir: `dist`
- SPA redirect (`/*` -> `/index.html`)
- Кеширование для `/assets/*` (immutable)
- Security заголовки для `index.html`

Шаги деплоя:
1. Создайте репозиторий (если ещё не) и запушьте код.
2. Войдите на https://app.netlify.com/ и нажмите "New site from Git".
3. Выберите ваш Git провайдер и репозиторий.
4. В настройках билда оставьте:
	- Build command: `npm run build`
	- Publish directory: `dist`
	(Netlify сам найдёт `netlify.toml` и применит его.)
5. (Опционально) Добавьте переменные окружения: Site settings → Build & deploy → Environment.
6. Нажмите Deploy.

Проверка после деплоя:
- Откройте сайт, перейдите по нескольким маршрутам (Services / Portfolio / Contact) — SPA роутинг должен работать при прямом вводе URL.
- Вкладка Network → убедитесь, что `assets` файлы отдаются с заголовком `cache-control: public, max-age=31536000, immutable`.
- Попробуйте обновить страницу на вложенном маршруте `/services` — не должно быть 404.

Локальная эмуляция (опционально):
Можно установить Netlify CLI и протестировать функции/redirects локально:

```bash
npm install -g netlify-cli
netlify dev
```

Если позже добавите serverless функции:
- Создайте папку `netlify/functions`.
- Экспортируйте handler в файлах `*.js`/`*.ts`.
- Отправляйте запросы на `/api/<name>` (уже есть redirect для примерного пути `/api/*`).

Оптимизации на будущее:
- Включить Edge Functions для критичных маршрутов (если появится необходимость).
- Добавить отдельный `404.html` и кастомный redirect на него со статусом 404.
- Подключить Netlify Forms или внешнюю форму (заменить локальный placeholder).
- Добавить `<link rel="preload">` для ключевых шрифтов в `index.html`.
